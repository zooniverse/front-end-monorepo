import { applySnapshot, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'

import { logToSentry } from '@helpers/logger'
import numberString from '@stores/types/numberString'

const Preferences = types
  .model('Preferences', {
    minicourses: types.maybe(types.frozen()),
    selected_workflow: types.maybe(types.string),
    tutorials_completed_at: types.maybe(types.frozen())
  })

const Settings = types
  .model('Settings', {
    workflow_id: types.maybe(types.string)
  })

const UserProjectPreferences = types
  .model('UserProjectPreferences', {
    activity_count: types.maybe(types.number),
    activity_count_by_workflow: types.maybe(types.frozen()),
    error: types.maybeNull(types.frozen({})),
    id: types.maybe(numberString),
    links: types.maybe(
      types.frozen({
        project: types.string,
        user: types.string
      })
    ),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    preferences: types.maybe(Preferences),
    settings: types.maybe(Settings)
  })
  .views(self => ({
    get assignedWorkflowID() {
      return self.settings?.workflow_id
    },

    promptAssignment(currentWorkflowID) {
      const project = getRoot(self).project

      if (self.assignedWorkflowID && currentWorkflowID && self.assignedWorkflowID !== currentWorkflowID) {
        return project.workflowIsActive(self.assignedWorkflowID)
      }

      return false
    },

    get isLoaded() {
      return self.loadingState === asyncStates.success
    }

  }))
  .actions(self => {
    async function _fetch() {
      const { client, project, user } = getRoot(self)
      const token = await auth.checkBearerToken()
      const authorization = `Bearer ${token}`
      const query = {
        project_id: project.id,
        user_id: user.id
      }

      const response = await client.panoptes.get('/project_preferences', query, { authorization })
      const [preferences] = response.body.project_preferences
      return preferences
    }

    return {
      reset() {
        const resetSnapshot = {
          activity_count: undefined,
          activity_count_by_workflow: undefined,
          error: undefined,
          id: undefined,
          links: undefined,
          loadingState: asyncStates.initialized,
          preferences: undefined,
          settings: undefined
        }
        applySnapshot(self, resetSnapshot)
      },

      setResource(resource) {
        applySnapshot(self, resource)
      },

      setLoadingState(state) {
        self.loadingState = state
      },

      fetchResource: flow(function* fetchResource() {
        try {
          if (!self.id) {
            self.setLoadingState(asyncStates.loading)
            const preferences = yield _fetch()
            if (preferences) {
              self.setResource(preferences)
            }
            self.setLoadingState(asyncStates.success)
          }
        } catch (error) {
          console.error(error)
          logToSentry(error)
          self.error = error
          self.setLoadingState(asyncStates.error)
        }
      }),

      refreshSettings: flow(function * refreshSettings() {
        try {
          const preferences = yield _fetch()
          if (preferences) {
            self.settings = preferences.settings
          }
        } catch (error) {
          console.error(error)
        }
      })
    }
  })

export default UserProjectPreferences