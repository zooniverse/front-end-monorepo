import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import {
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

let rootStore

const tutorial = TutorialFactory.build()
const workflow = WorkflowFactory.build()

const panoptesClient = stubPanoptesJs({ workflows: workflow })

const medium = TutorialMediumFactory.build()

const clientStub = Object.assign({}, panoptesClient, {
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
})

const authClientStubWithoutUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
}

const authClientStubWithUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
}

describe.only('Model > TutorialStore', function () {
  afterEach(function () {
    clientStub.tutorials.get.resetHistory()
    clientStub.tutorials.getAttachedImages.resetHistory()
  })

  it('should exist', function () {
    expect(TutorialStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no workflow', function () {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithoutUser, client: clientStub })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
  })

  it('should set the tutorial if there is a workflow', function (done) {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithUser, client: clientStub })
    rootStore.workflows.setActive(workflow.id)
      .then(() => {
        const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
        expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
  })

  describe('Actions > fetchTutorials', function () {
    it('should request for tutorials linked to the active workflow', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client: clientStub })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(clientStub.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
      }).then(done, done)
    })

    it('should not request for media or set the resources if there are no tutorials in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client: Object.assign({}, panoptesClient, {
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
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub
      })

      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(clientStub.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
      }).then(done, done)
    })

    it('should call setTutorials if there are tutorials', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub
      })

      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')
      rootStore.workflows.setActive(workflow.id).then(() => {
        expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
      }).then(() => {
        setTutorialsSpy.restore()
      }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: Object.assign({}, panoptesClient, {
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
    it('should not call setMediaResources if there is not media in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
      authClient: authClientStubWithoutUser, client: Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } } )},
          getAttachedImages: () => { return Promise.resolve({ body: { media: [] }} )}
        }})
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
          authClient: authClientStubWithoutUser, client: clientStub
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
    it('should call resetActiveTutorial if the id parameter is not defined', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub
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
        authClient: authClientStubWithoutUser, client: clientStub
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
    })

    it('should call setTutorialStep if the id parameter is defined', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
          authClient: authClientStubWithoutUser, client: clientStub
        })
      const setTutorialStepSpy = sinon.spy(rootStore.tutorials, 'setTutorialStep')

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(setTutorialStepSpy).to.have.been.calledOnceWith(1)
      }).then(() => {
        setTutorialStepSpy.restore()
      }).then(done, done)
    })
  })
})
