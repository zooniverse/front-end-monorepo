import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import ProjectStore from './ProjectStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import {
  ProjectFactory,
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory,
  UPPFactory,
  UserFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

let rootStore
const seenMock = new Date().toISOString()
const token = '1235'

const user = UserFactory.build()
const project = ProjectFactory.build()
const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
const medium = TutorialMediumFactory.build()

const tutorial = TutorialFactory.build({ steps: [
  { content: '# Hello', media: medium.id },
  { content: '# Step 2' }
] })

const tutorialNullKind = TutorialFactory.build(
  {
    steps: [
      { content: '# Hello', media: medium.id },
      { content: '# Step 2' }
    ],
    kind: null
  }
)

const tutorialMiniCourseKind = TutorialFactory.build(
  {
    steps: [
      { content: '# Hello', media: medium.id },
      { content: '# Step 2' }
    ],
    kind: 'mini-course'
  }
)

const upp = UPPFactory.build()
const uppWithTutorialTimeStamp = UPPFactory.build({ 
  preferences: {
    tutorials_completed_at: {
      [tutorial.id]: seenMock 
    }
  }
})

const panoptesClient = stubPanoptesJs({ workflows: workflow })

const clientStub = (tutorialResource = tutorial) => {
  return Object.assign({}, panoptesClient, {
    tutorials: {
      get: sinon.stub().callsFake(() => {
        return Promise.resolve({
          body: {
            tutorials: [tutorialResource]
          }
        })
      }),
      getAttachedImages: sinon.stub().callsFake(() => {
        return Promise.resolve({
          body: {
            media: [medium]
          }
        })
      })
    }
  })
}

const authClientStubWithoutUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
}

const authClientStubWithUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
}

describe('Model > TutorialStore', function () {
  it('should exist', function () {
    expect(TutorialStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no workflow', function () {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithoutUser, client: clientStub() })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
  })

  it('should set the tutorial if there is a workflow', function (done) {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithUser, client: clientStub() })
    sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())
    rootStore.workflows.setActive(workflow.id)
      .then(() => {
        const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
        expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
      }).then(done, done)
  })

  describe('Actions > fetchTutorials', function () {
    it('should request for tutorials linked to the active workflow', function (done) {
      const client = clientStub()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(client.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
      }).then(done, done)
    })

    it('should not request for media or set the resources if there are no tutorials in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.resolve({ body: { tutorials: [] } }) }
          }
        })
      })

      const fetchMediaSpy = sinon.spy(rootStore.tutorials, 'fetchMedia')
      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(fetchMediaSpy).to.have.not.been.called
        expect(setTutorialsSpy).to.have.not.been.called
        expect(rootStore.tutorials.loadingState).to.equal(asyncStates.success)
      }).then(() => {
        fetchMediaSpy.restore()
        setTutorialsSpy.restore()
      }).then(done, done)
    })

    it('should request for the media if there are tutorials', function (done) {
      const client = clientStub()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(client.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
      }).then(done, done)
    })

    it('should call setTutorials if there are tutorials', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())

      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
        setTutorialsSpy.restore()
      }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.reject('testing error state') }
          }
        })
      })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(rootStore.tutorials.loadingState).to.equal(asyncStates.error)
      }).then(done, done)
    })
  })

  describe('Actions > fetchMedia', function () {
    it('should not call setMediaResources if there is no media in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } }) },
            getAttachedImages: () => { return Promise.resolve({ body: { media: [] } }) }
          } })
      })

      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setMediaResourcesSpy).to.have.not.been.called
      }).then(() => {
        setMediaResourcesSpy.restore()
      }).then(done, done)
    })

    it('should call setMediaResources if there is media in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
      }).then(() => {
        setMediaResourcesSpy.restore()
      }).then(done, done)
    })
  })

  describe('Actions > setActiveTutorial', function () {
    it('should reset the active tutorial if the id parameter is not defined', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      const resetActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'resetActiveTutorial')
      rootStore.tutorials.setActiveTutorial()
      expect(resetActiveTutorialSpy).to.have.been.calledOnce
      expect(rootStore.tutorials.active).to.be.undefined
      expect(rootStore.tutorials.activeStep).to.be.undefined
      expect(rootStore.tutorials.activeMedium).to.be.undefined
      resetActiveTutorialSpy.restore()
    })

    it('should set the active tutorial to the id parameter', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
    })

    it('should set the tutorial step if the id parameter is defined', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      const setTutorialStepSpy = sinon.spy(rootStore.tutorials, 'setTutorialStep')

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(setTutorialStepSpy).to.have.been.calledOnceWith(1)
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(() => {
        setTutorialStepSpy.restore()
      }).then(done, done)
    })

    it('should set the seen time if the id parameter is defined', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      const setSeenTimeSpy = sinon.spy(rootStore.tutorials, 'setSeenTime')

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(setSeenTimeSpy).to.have.been.calledOnce
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(() => {
        setSeenTimeSpy.restore()
      }).then(done, done)
    })
  })

  describe('Actions > setTutorialStep', function () {
    it('should not set the active step if there is not an active tutorial', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setTutorialStep(0)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.be.undefined
      }).then(done, done)
    })

    it('should set not the active step if that stepIndex does not exist in the steps array', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 2)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.be.undefined
      }).then(done, done)
    })

    it('should set the active step with the stepIndex parameter', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(done, done)
    })

    it('should set the active step with the default of 0', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(0)
      }).then(done, done)
    })

    it('should set the activeMedium if it exists for the step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())
      rootStore.workflows.setActive(workflow.id).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
        rootStore.tutorials.setMediaResources([medium])
      }).then(() => {
        expect(rootStore.tutorials.activeMedium).to.deep.equal(medium)
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
      }).then(done, done)
    })
  })

  describe('Actions > resetSeen', function () {
    it('should reset the tutorial seen time when a new workflow loads', function (done) {
      const seen = new Date().toISOString()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create({ tutorialSeenTime: seen }),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined
      }).then(done, done)
    })
  })

  describe('Actions > setSeenTime', function () {
    it('should not set the seen time if there is not an active tutorial', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      rootStore.tutorials.setSeenTime()
      expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined
    })

    it('should set the seen time for the tutorial kind of tutorial resource', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())
      rootStore.workflows.setActive(workflow.id).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
      }).then(done, done)
    })

    it('should set the seen time for the null kind of tutorial resource', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub(tutorialNullKind)
      })
      sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())
      rootStore.workflows.setActive(workflow.id).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorialNullKind.id)
      }).then(() => {
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
      }).then(done, done)
    })
  })

  describe('Actions > setModalVisibility', function () {
    it('should set the modal visibility', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      rootStore.tutorials.setModalVisibility(true)
      expect(rootStore.tutorials.showModal).to.be.true
      rootStore.tutorials.setModalVisibility(false)
      expect(rootStore.tutorials.showModal).to.be.false
    })
  })

  describe('Actions > showTutorialInModal', function () {
    let clientStubWithUPP
    let clientStubWithUPPTimestamp
    before(function () {
      const panoptesClientWithUPP = stubPanoptesJs({ project_preferences: upp, workflows: workflow })
      const panoptesClientWithUPPTimestamp = stubPanoptesJs({ project_preferences: uppWithTutorialTimeStamp, workflows: workflow })
      const tutorialsClient = { 
        tutorials: {
          get: sinon.stub().callsFake(() => {
            return Promise.resolve({
              body: {
                tutorials: [tutorial]
              }
            })
          }),
          getAttachedImages: sinon.stub().callsFake(() => {
            return Promise.resolve({
              body: {
                media: [medium]
              }
            })
          })
        }
      }
      clientStubWithUPP = Object.assign({}, tutorialsClient, panoptesClientWithUPP)
      clientStubWithUPPTimestamp = Object.assign({}, tutorialsClient, panoptesClientWithUPPTimestamp)
    })

    it('should show the tutorial for logged out users', function (done) {
      rootStore = RootStore.create({
        projects: ProjectStore.create(),
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
      const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
      sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => {})
      sinon.stub(rootStore.tutorials, 'fetchMedia').callsFake(() => Promise.resolve())

      rootStore.projects.setResource(project)
      rootStore.projects.setActive(project.id)
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
        expect(setModalVisibilitySpy).to.have.been.calledOnce
        expect(rootStore.tutorials.active).to.deep.equal(tutorial)
        expect(rootStore.tutorials.showModal).to.be.true
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
        setActiveTutorialSpy.restore()
        setModalVisibilitySpy.restore()
        rootStore.userProjectPreferences.updateUPP.restore()
      }).then(done, done)
    })

    it('should show the tutorial for logged in users without a seen timestamp for the loaded tutorial', function (done) {
      rootStore = RootStore.create({}, {
        authClient: authClientStubWithUser, client: clientStubWithUPP
      })
      const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
      const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
      sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => { })
      sinon.stub(rootStore.tutorials, 'fetchMedia')

      rootStore.projects.setResource(project)
      rootStore.projects.setActive(project.id)
      rootStore.workflows.setActive(workflow.id)
        .then(() => {
          expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
          expect(setModalVisibilitySpy).to.have.been.calledOnce
          expect(rootStore.tutorials.active).to.deep.equal(tutorial)
          expect(rootStore.tutorials.showModal).to.be.true
        }).then(() => {
          rootStore.tutorials.fetchMedia.restore()
          setActiveTutorialSpy.restore()
          setModalVisibilitySpy.restore()
          rootStore.userProjectPreferences.updateUPP.restore()
        }).then(done, done)
    })

    it('should not show the tutorial for logged in users with a seen timestamp for the loaded tutorial', function (done) {
      rootStore = RootStore.create({}, {
        authClient: authClientStubWithUser, client: clientStubWithUPPTimestamp
      })
      const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
      const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
      sinon.stub(rootStore.tutorials, 'fetchMedia')

      rootStore.projects.setResource(project)
      rootStore.projects.setActive(project.id)
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setActiveTutorialSpy).to.not.have.been.called
        expect(setModalVisibilitySpy).to.not.have.been.called
        expect(rootStore.tutorials.active).to.be.undefined
        expect(rootStore.tutorials.showModal).to.be.false
      }).then(() => {
        rootStore.tutorials.fetchMedia.restore()
        setActiveTutorialSpy.restore()
        setModalVisibilitySpy.restore()
      }).then(done, done)
    })
  })
})
