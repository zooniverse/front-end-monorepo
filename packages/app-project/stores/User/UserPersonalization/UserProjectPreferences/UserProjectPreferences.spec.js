import { when } from 'mobx'
import { getSnapshot } from 'mobx-state-tree'
import nock from 'nock'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { talkAPI } from '@zooniverse/panoptes-js'

import initStore from '@stores/initStore'
import { statsClient } from '../YourStats'
import UserProjectPreferences from './UserProjectPreferences'

describe('Stores > UserProjectPreferences', function () {
  const project = {
    id: '2',
    display_name: 'Hello',
    loadingState: asyncStates.success,
    slug: 'test/project'
  }
  const user = {
    id: '123',
    loadingState: asyncStates.success,
    login: 'test-user',
    personalization: {
      projectPreferences: {
        id: '5',
        loadingState: asyncStates.success
      }
    }
  }
  const initialState = {
    activity_count: undefined,
    activity_count_by_workflow: undefined,
    error: undefined,
    id: undefined,
    links: undefined,
    loadingState: asyncStates.initialized,
    preferences: undefined,
    settings: undefined
  }
  const upp = {
    activity_count: 23,
    activity_count_by_workflow: {},
    id: '555',
    links: {
      project: '2',
      user: '123'
    },
    preferences: {
      minicourses: undefined,
      selected_workflow: undefined,
      tutorials_completed_at: undefined
    },
    settings: {
      workflow_id: '999'
    }
  }
  const authorization = 'Bearer '
  const endpoint = '/project_preferences'
  const query = {
    project_id: '2',
    user_id: '123'
  }

  function preferencesAreReady(preferences) {
    return function preferencesAreLoaded() {
      const { loadingState } = preferences
      const { error, success } = asyncStates
      return (loadingState === success) || (loadingState === error)
    }
  }

  before(function () {
    sinon.stub(statsClient, 'request')
    sinon.stub(talkAPI, 'get').resolves([])
  })

  after(function () {
    statsClient.request.restore()
    talkAPI.get.restore()
  })

  describe('with a snapshot', function () {
    let rootStore

    before(function () {
      rootStore = initStore(true, {
        project,
        user
      })
      sinon.spy(rootStore.client.panoptes, 'get')
    })

    after(function () {
      rootStore.client.panoptes.get.restore()
    })

    it('should exist', function () {
      expect(UserProjectPreferences).to.be.an('object')
    })

    it('should not request for the resource if a snapshot has been applied', function () {
      expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.not.have.been.called()
    })
  })

  describe('fetching the resource', function () {
    describe('when there is a resource in the response', function () {
      let rootStore

      before(function () {
        nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(200, {
            project_preferences: [
              upp
            ]
          })

        rootStore = initStore(true, {
          project,
          user
        })
        sinon.spy(rootStore.client.panoptes, 'get')
      })

      after(function () {
        nock.cleanAll()
      })

      it('should request the user project preferences resource', async function () {
        const { projectPreferences } = rootStore.user.personalization
        projectPreferences.reset()
        expect(rootStore.client.panoptes.get).to.not.have.been.called()
        expect(projectPreferences.loadingState).to.equal(asyncStates.initialized)
        projectPreferences.fetchResource()
        await when(preferencesAreReady(projectPreferences))
        expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
        expect(projectPreferences.loadingState).to.equal(asyncStates.success)
        projectPreferences.reset()
      })

      it('should store the UPP resource', async function () {
        const { projectPreferences } = rootStore.user.personalization
        projectPreferences.reset()
        expect(getSnapshot(projectPreferences)).to.deep.equal(initialState)
        projectPreferences.fetchResource()
        await when(preferencesAreReady(projectPreferences))
        const storedUPP = Object.assign({}, upp, { error: undefined, loadingState: asyncStates.success })
        expect(getSnapshot(projectPreferences)).to.deep.equal(storedUPP)
      })

      it('should set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(23)
      })
    })

    describe('when there are no user project preferences in the response', function () {
      let rootStore

      before(function () {
        nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(200, {
            project_preferences: []
          })

        rootStore = initStore(true, {
          project,
          user
        })
      })

      after(function () {
        nock.cleanAll()
      })

      it('should not apply the UPP resource', async function () {
        const { projectPreferences } = rootStore.user.personalization
        projectPreferences.reset()
        expect(projectPreferences.loadingState).to.equal(asyncStates.initialized)
        await rootStore.user.personalization.projectPreferences.fetchResource()
        expect(projectPreferences.loadingState).to.equal(asyncStates.success)
        expect(projectPreferences.id).to.be.undefined()
      })

      it('should not set the total classification count on the parent node', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(0)
      })
    })

    describe('when the request errors', function () {
      let rootStore

      before(function () {
        nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .replyWithError('Error!')

        rootStore = initStore(true, {
          project,
          user
        })
      })

      after(function () {
        nock.cleanAll()
      })

      it('should store the error', async function () {
        const { projectPreferences } = rootStore.user.personalization
        projectPreferences.reset()
        expect(projectPreferences.loadingState).to.equal(asyncStates.initialized)
        expect(projectPreferences.error).to.be.undefined()
        projectPreferences.fetchResource()
        await when(preferencesAreReady(projectPreferences))
        expect(projectPreferences.error.message).to.equal('Error!')
        expect(projectPreferences.loadingState).to.equal(asyncStates.error)
      })
    })

    describe('when the response errors', function () {
      let rootStore

      before(function () {
        nock('https://panoptes-staging.zooniverse.org/api')
          .persist()
          .get('/project_preferences')
          .query(true)
          .reply(401, {
            project_preferences: []
          })

        rootStore = initStore(true, {
          project,
          user
        })
      })

      after(function () {
        nock.cleanAll()
      })

      it('should store the error', async function () {
        const { projectPreferences } = rootStore.user.personalization
        projectPreferences.reset()
        expect(projectPreferences.loadingState).to.equal(asyncStates.initialized)
        expect(projectPreferences.error).to.be.undefined()
        projectPreferences.fetchResource()
        await when(preferencesAreReady(projectPreferences))
        expect(projectPreferences.error.message).to.equal('Unauthorized')
        expect(projectPreferences.loadingState).to.equal(asyncStates.error)
      })
    })
  })

  describe('refreshing your preferences', function () {
    let rootStore

    beforeEach(function () {
      const personalization = {
        projectPreferences: {
          activity_count: 28,
          activity_count_by_workflow: {},
          id: '555',
          loadingState: asyncStates.success
        }
      }
      const userWithPrefs = { ...user, personalization }

      nock('https://panoptes-staging.zooniverse.org/api')
        .get('/project_preferences')
        .query(true)
        .reply(200, {
          project_preferences: [
            upp
          ]
        })

      rootStore = initStore(true, {
        project,
        user: userWithPrefs
      })
      const { projectPreferences } = rootStore.user.personalization
      projectPreferences.refreshSettings()
    })

    it('should not change your total classification count', async function () {
      expect(rootStore.user.personalization.totalClassificationCount).to.equal(28)
      const { projectPreferences } = rootStore.user.personalization
      await when(() => projectPreferences.assignedWorkflowID)
      expect(rootStore.user.personalization.totalClassificationCount).to.equal(28)
    })

    it('should not change the app loading state', function () {
      expect(rootStore.appLoadingState).to.equal(asyncStates.success)
    })

    it('should update your assigned workflow', async function () {
      const { projectPreferences } = rootStore.user.personalization
      expect(projectPreferences.assignedWorkflowID).to.be.undefined()
      await when(() => projectPreferences.assignedWorkflowID)
      expect(projectPreferences.assignedWorkflowID).to.equal('999')
    })
  })

  describe('Views > promptAssignment', function () {
    const user = {
      id: '5',
      personalization: {
        projectPreferences: {
          id: '10',
          settings: {
            workflow_id: '555'
          }
        }
      }
    }

    describe('when a workflow is not currently selected', function () {
      let rootStore

      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should not prompt the user', function () {
        const { projectPreferences } = rootStore.user.personalization
        expect(projectPreferences.assignedWorkflowID).to.equal('555')
        expect(projectPreferences.promptAssignment()).to.be.false()
      })
    })

    describe('when the assigned workflow is not active', function () {
      let rootStore

      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['123']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should not prompt the user', function () {
        const { projectPreferences } = rootStore.user.personalization
        expect(projectPreferences.assignedWorkflowID).to.equal('555')
        expect(projectPreferences.promptAssignment('123')).to.be.false()
        expect(rootStore.project.workflowIsActive('555')).to.be.false()
      })
    })

    describe('when the assigned workflow is the same as the current workflow', function () {
      let rootStore

      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should not prompt the user', function () {
        const { projectPreferences } = rootStore.user.personalization
        expect(projectPreferences.assignedWorkflowID).to.equal('555')
        expect(projectPreferences.promptAssignment('555')).to.be.false()
        expect(rootStore.project.workflowIsActive('555')).to.be.true()
      })
    })

    describe('when the assigned workflow is not the same as the current workflow', function () {
      let rootStore

      before(function () {
        const project = {
          id: '2',
          links: {
            active_workflows: ['555', '123']
          }
        }

        rootStore = initStore(true, {
          project,
          user
        })
      })

      it('should prompt the user', function () {
        const { projectPreferences } = rootStore.user.personalization
        expect(projectPreferences.assignedWorkflowID).to.equal('555')
        expect(projectPreferences.promptAssignment('123')).to.be.true()
        expect(rootStore.project.workflowIsActive('123')).to.be.true()
        expect(rootStore.project.workflowIsActive('555')).to.be.true()
      })
    })
  })
})
