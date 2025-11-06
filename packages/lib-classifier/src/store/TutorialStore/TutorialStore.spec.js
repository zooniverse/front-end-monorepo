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
    checkCurrent: sinon.stub().resolves(null),
    checkBearerToken: sinon.stub().resolves(null),
    listen: sinon.stub()
  }

  const authClientStubWithUser = {
    checkCurrent: sinon.stub().resolves(user),
    checkBearerToken: sinon.stub().resolves(token),
    listen: sinon.stub()
  }

  async function fetchTutorials (rootStore) {
    await rootStore.workflows.setActive(workflow.id)
    await rootStore.tutorials.fetchTutorials()
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

    it('should set the tutorial if there is a workflow', async function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)

      await fetchTutorials(rootStore)
      const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
      expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
    })
  })

  describe('Actions > fetchTutorials', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should request for tutorials linked to the active workflow', async function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      await fetchTutorials(rootStore)
      expect(panoptesClientStub.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
    })

    it('should not request for media or set the resources if there are no tutorials in the response', async function () {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [] } }) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      await fetchTutorials(rootStore)
      expect(rootStore.tutorials.loadingState).to.equal(asyncStates.success)
    })

    it('should request for the media if there are tutorials', async function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      await rootStore.workflows.setActive(workflow.id)
      await panoptesClientStub.tutorials.getAttachedImages.resetHistory()
      await rootStore.tutorials.fetchTutorials()
      expect(panoptesClientStub.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
    })

    it.skip('should call setTutorials if there are tutorials', async function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')

      await fetchTutorials(rootStore)
      expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
      setTutorialsSpy.restore()
    })

    it('should set the loadingState to error if the request errors', async function () {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.reject(new Error('testing error state')) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      await fetchTutorials(rootStore)
      expect(rootStore.tutorials.loadingState).to.equal(asyncStates.error)
    })
  })

  describe('Actions > fetchMedia', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it.skip('should not call setMediaResources if there is no media in the response', async function () {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } }) },
          getAttachedImages: () => { return Promise.resolve({ body: { media: [] } }) }
        }
      })

      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      await fetchTutorials(rootStore)
      expect(setMediaResourcesSpy).to.have.not.been.called
      setMediaResourcesSpy.restore()
    })

    it.skip('should call setMediaResources if there is media in the response', async function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      await fetchTutorials(rootStore)
      expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
      setMediaResourcesSpy.restore()
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
      expect(rootStore.tutorials.active).to.equal(undefined)
      expect(rootStore.tutorials.activeStep).to.equal(0)
      expect(rootStore.tutorials.activeMedium).to.equal(undefined)
    })

    it('should set the active tutorial to the id parameter', async function () {
      await rootStore.tutorials.setTutorials([tutorial])
      rootStore.tutorials.setActiveTutorial(tutorial.id)
      expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
    })
  })
})
