import { when } from 'mobx'
import { getSnapshot } from 'mobx-state-tree'
import { Factory } from 'rosie'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import merge from 'lodash/merge'

import RootStore from '@store/RootStore'
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

    it('should be in an initialized state', function () {
      rootStore = setupStores(clientStub, authClientStubWithoutUser)
      expect(rootStore.userProjectPreferences.loadingState).to.equal(asyncStates.initialized)
      rootStore = null
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
      rootStore.userProjectPreferences.setUPP(upp)
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

      expect(getSnapshot(rootStore.userProjectPreferences.active)).to.deep.equal(updatedUPP)
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
