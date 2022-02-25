import { Factory } from 'rosie'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from '@store/RootStore'
import TutorialStore from './TutorialStore'
import {
  ProjectFactory,
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory,
  UPPFactory,
  UserFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > TutorialStore', function () {
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

  const upp = UPPFactory.build()
  const uppWithTutorialTimeStamp = UPPFactory.build({
    preferences: {
      tutorials_completed_at: {
        [tutorial.id]: seenMock
      }
    }
  })

  const panoptesClient = stubPanoptesJs({
    subjects: Factory.buildList('subject', 10),
    workflows: workflow
  })

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

  function fetchTutorials (rootStore) {
    return rootStore.workflows.setActive(workflow.id)
      .then(() => {
        return rootStore.tutorials.fetchTutorials()
      })
  }

  function setupStores (clientStub, authClientStub) {
    return RootStore.create({
      classifications: {},
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      projects: {},
      subjects: {},
      subjectViewer: {},
      workflowSteps: {},
      userProjectPreferences: {}
    }, { client: clientStub, authClient: authClientStub })
  }

  describe('when initialized', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should exist', function () {
      expect(TutorialStore).to.be.an('object')
    })

    it('should remain in an initialized state if there is no workflow', function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
    })

    it('should set the tutorial if there is a workflow', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)

      fetchTutorials(rootStore)
        .then(() => {
          const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
          expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
        }).then(done, done)
    })
  })

  describe('Actions > fetchTutorials', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should request for tutorials linked to the active workflow', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(panoptesClientStub.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
        }).then(done, done)
    })

    it('should not request for media or set the resources if there are no tutorials in the response', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [] } }) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.success)
        }).then(done, done)
    })

    it('should request for the media if there are tutorials', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      rootStore.workflows.setActive(workflow.id)
        .then(() => panoptesClientStub.tutorials.getAttachedImages.resetHistory())
        .then(() => {
          return rootStore.tutorials.fetchTutorials()
        })
        .then(() => {
          expect(panoptesClientStub.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
        }).then(done, done)
    })

    it.skip('should call setTutorials if there are tutorials', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
        }).then(() => {
          setTutorialsSpy.restore()
        }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.reject(new Error('testing error state')) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe('Actions > fetchMedia', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it.skip('should not call setMediaResources if there is no media in the response', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } }) },
          getAttachedImages: () => { return Promise.resolve({ body: { media: [] } }) }
        }
      })

      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.not.been.called()
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })

    it.skip('should call setMediaResources if there is media in the response', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })
  })

  describe('Actions > setActiveTutorial', function () {
    let rootStore
    beforeEach(function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
    })

    it('should reset the active tutorial if the id parameter is not defined', function () {
      rootStore.tutorials.setActiveTutorial()
      expect(rootStore.tutorials.active).to.be.undefined()
      expect(rootStore.tutorials.activeStep).to.equal(0)
      expect(rootStore.tutorials.activeMedium).to.be.undefined()
    })

    it('should set the active tutorial to the id parameter', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
    })

    it('should set the seen time for a new tutorial', function (done) {

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial()
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(done, done)
    })
  })

  describe('Actions > resetSeen', function () {
    let rootStore
    it('should reset the tutorial seen time when a new workflow loads', function (done) {
      const seen = new Date().toISOString()
      const panoptesClientStub = clientStub()

      rootStore = RootStore.create({
        classifications: {},
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        projects: {},
        subjects: {},
        subjectViewer: {},
        tutorials: TutorialStore.create({ tutorialSeenTime: seen }),
        workflowSteps: {},
        userProjectPreferences: {}
      }, { client: panoptesClientStub, authClientStubWithoutUser })

      fetchTutorials(rootStore)
        .then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined()
        }).then(done, done)
    })
  })

  describe('Actions > setSeenTime', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })
    it('should not set the seen time if there is not an active tutorial', function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      rootStore.tutorials.setSeenTime()
      expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined()
    })

    it('should set the seen time for the tutorial kind of tutorial resource', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial()
          rootStore.tutorials.setActiveTutorial(tutorial.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })

    it('should set the seen time for the null kind of tutorial resource', function (done) {
      const panoptesClientStub = clientStub(tutorialNullKind)
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial()
          rootStore.tutorials.setActiveTutorial(tutorialNullKind.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })
  })
})
