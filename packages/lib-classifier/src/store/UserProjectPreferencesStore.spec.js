import { when } from 'mobx'
import { Factory } from 'rosie'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import merge from 'lodash/merge'

import RootStore from './RootStore'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'
import {
  ProjectFactory,
  TutorialFactory,
  UPPFactory,
  UserFactory,
  WorkflowFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > UserProjectPreferencesStore', function () {
  const project = ProjectFactory.build()
  const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
  const upp = UPPFactory.build()
  const user = UserFactory.build()
  const token = '1234'
  const etag = 'W/"8d26cb6718e250b"'

  const clientStub = stubPanoptesJs({
    projects: project,
    project_preferences: upp,
    subjects: Factory.buildList('subject', 10),
    workflows: workflow
  })

  const clientStubWithoutUPP = stubPanoptesJs({
    projects: project,
    project_preferences: null,
    subjects: Factory.buildList('subject', 10),
    workflows: workflow
  })

  function mockUserAPI(user) {
    return async function getUser() {
      return user
    }
  }

  function mockTokenAPI(token) {
    return async function getToken() {
      return token
    }
  }

  const authClientStubWithoutUser = {
    checkCurrent: sinon.stub().callsFake(mockUserAPI(null)),
    checkBearerToken: sinon.stub().callsFake(mockTokenAPI(null))
  }

  const authClientStubWithUser = {
    checkCurrent: sinon.stub().callsFake(mockUserAPI(user)),
    checkBearerToken: sinon.stub().callsFake(mockTokenAPI(token))
  }

  function setupStores (clientStub, authClientStub) {
    return RootStore.create({
      classifications: {},
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      subjects: {},
      subjectViewer: {},
      tutorials: {},
      workflows: {},
      workflowSteps: {}
    }, { authClient: authClientStub, client: clientStub })
  }

  function preferencesAreReady(preferences) {
    return function preferencesAreLoaded() {
      const { loadingState } = preferences
      const { error, success } = asyncStates
      return (loadingState === success) || (loadingState === error)
    }
  }

  describe('when instantiated', function () {
    let rootStore
    it('should exist', function () {
      expect(UserProjectPreferencesStore).to.be.an('object')
    })

    it('should remain in an initialized state if there is no project', function () {
      rootStore = setupStores(clientStub, authClientStubWithoutUser)
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.initialized)
      rootStore = null
    })

    it('should set project preferences if there is a user and a project', async function () {
      rootStore = setupStores(clientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      const uppInStore = rootStore.userProjectPreferences.active
      expect(uppInStore.toJSON()).to.deep.equal(upp)
      rootStore = null
    })
  })

  describe('Actions > checkForUser', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should check for a user upon initialization when there is a project', async function () {
      rootStore = setupStores(clientStub, authClientStubWithoutUser)
      await rootStore.projects.setActive(project.id)
      expect(authClientStubWithoutUser.checkBearerToken).to.have.been.called()
      expect(authClientStubWithoutUser.checkCurrent).to.have.been.called()
    })

    it('should set to a successful state if there is no user', async function () {
      rootStore = setupStores(clientStub, authClientStubWithoutUser)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.success)
      expect(rootStore.userProjectPreferences.active).to.be.undefined()
    })

    it('should set state to error upon error', async function () {
      const errorAuthClientStub = {
        checkBearerToken: () => Promise.reject(new Error('testing error handling')),
        checkCurrent: () => Promise.reject(new Error('testing error handling'))
      }

      rootStore = setupStores(clientStub, errorAuthClientStub)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.error)
    })

    it.skip('should call fetchUPP if there is a user', async function () {
      rootStore = setupStores(clientStub, authClientStubWithUser)
      const fetchUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'fetchUPP')

      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(fetchUPPSpy).to.have.been.called()
    })
  })

  describe('Actions > fetchUPP', function () {
    let getSpy
    let rootStore
    before(function () {
      getSpy = sinon.spy(clientStub.panoptes, 'get')
    })

    afterEach(function () {
      getSpy.resetHistory()
      rootStore = null
    })

    after(function () {
      getSpy.restore()
    })

    it('should set the loading state to loading then to success upon successful request', async function () {
      rootStore = setupStores(clientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.initialized)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.success)
    })

    it('should request for the user project preferences', async function () {
      rootStore = setupStores(clientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(getSpy).to.have.been.calledWith(
        '/project_preferences',
        { project_id: project.id, user_id: user.id },
        { authorization: 'Bearer 1234' }
      )
    })

    it.skip('should call createUPP action upon successful request and there is not an existing UPP', async function () {
      rootStore = setupStores(clientStubWithoutUPP, authClientStubWithUser)
      const createUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'createUPP')
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(createUPPSpy).to.have.been.calledOnceWith(`Bearer ${token}`)
      createUPPSpy.restore()
    })

    it.skip('should call setUPP action upon successful request and there is an existing UPP', async function () {
      rootStore = setupStores(clientStub, authClientStubWithUser)
      const setUPPSpy = sinon.spy(rootStore.userProjectPreferences, 'setUPP')
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(setUPPSpy).to.have.been.calledOnceWith(upp)
      setUPPSpy.restore()
    })
  })

  describe('Actions > createUPP', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should create new user project preferences', async function () {
      const postStub = sinon.stub().callsFake(() => Promise.resolve({ body: { project_preferences: [upp] } }))
      const panoptesClientStub = {
        panoptes: {
          get: (url) => {
            if (url === `/projects/${project.id}`) return Promise.resolve({ body: { projects: [project] } })
            return Promise.resolve({ body: {
              subjects: Factory.buildList('subject', 10),
              project_preferences: [],
              workflows: [workflow]
            } })
          },
          post: postStub
        }
      }

      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(postStub).to.have.been.calledOnceWith(
        '/project_preferences',
        { project_preferences: {
          links: { project: project.id },
          preferences: {}
        } },
        { authorization: `Bearer ${token}` }
      )
    })

    it('should set the loading state to error upon error', async function () {
      const panoptesClientStub = {
        panoptes: {
          get: (url) => {
            if (url === `/projects/${project.id}`) return Promise.resolve({ body: { projects: [project] } })
            return Promise.resolve({ body: {
              subjects: Factory.buildList('subject', 10),
              project_preferences: [],
              workflows: [workflow]
            } })
          },
          post: () => Promise.reject(new Error('testing error handling'))
        }
      }

      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
      await when(preferencesAreReady(rootStore.userProjectPreferences))
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.error)
    })
  })

  describe('Actions > updateUPP', function () {
    let changes
    let panoptesClientStub
    let updatedUPP
    let rootStore

    before(function () {
      const tutorial = TutorialFactory.build()
      const seen = new Date().toISOString()
      changes = {
        preferences: {
          tutorials_completed_at: {
            [tutorial.id]: seen
          }
        }
      }
      updatedUPP = merge({}, upp, changes)

      panoptesClientStub = {
        panoptes: {
          get: sinon.stub().callsFake((url, params) => {
            if (url === `/projects/${project.id}`) {
              return Promise.resolve({ body: { projects: [project] } })
            }
            if (url === `/project_preferences` && params === { project_id: project.id, user_id: user.id }) {
              return Promise.resolve({ body: { project_preferences: [upp] } })
            }
            return Promise.resolve({ body: {
              subjects: Factory.buildList('subject', 10),
              project_preferences: [upp],
              workflows: [workflow]
            }, headers: { etag } })
          }),
          put: sinon.stub().callsFake(() => Promise.resolve({ body: { project_preferences: [updatedUPP] } }))
        }
      }

      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)
      rootStore.projects.setActive(project.id)
    })

    afterEach(function () {
      rootStore.userProjectPreferences.reset()
    })

    it('should update user project preferences', async function () {
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.put).to.have.been.calledOnceWith(
        `/project_preferences/${upp.id}`,
        {
          project_preferences: { preferences: updatedUPP.preferences }
        },
        { authorization: `Bearer ${token}`, etag }
      )

      expect(rootStore.userProjectPreferences.active).to.deep.equal(updatedUPP)
    })

    it('should re-request for the upp if the store does not have a stored etag header', async function () {
      expect(rootStore.userProjectPreferences.headers.etag).to.be.undefined()
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.get.withArgs(
        `/project_preferences/${upp.id}`,
        null,
        { authorization: `Bearer ${token}` })
      ).to.have.been.calledOnce()
      rootStore.client.panoptes.get.resetHistory()
    })

    it('should not re-request for the upp if the store has a stored etag header', async function () {
      await rootStore.userProjectPreferences.updateUPP(changes)
      expect(rootStore.client.panoptes.get.withArgs(
        `/project_preferences/${upp.id}`,
        null,
        { authorization: `Bearer ${token}` })
      ).to.have.not.been.called()
      rootStore.client.panoptes.get.resetHistory()
    })
  })
})
