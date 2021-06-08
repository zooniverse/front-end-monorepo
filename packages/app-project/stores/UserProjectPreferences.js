import { applySnapshot, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'
import numberString from './types/numberString'

const Preferences = types
  .model('Preferences', {
    minicourses: types.maybe(types.frozen()),
    selected_workflow: types.maybe(types.string),
    tutorials_completed_at: types.maybe(types.frozen())
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
    settings: types.maybe(types.frozen())
  })
  .actions(self => {
    return {
      fetchResource: flow(function* fetchResource() {
        const { client, project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const authorization = `Bearer ${token}`
          const query = {
            project_id: project.id,
            user_id: user.id
          }

          const response = yield client.panoptes.get('/project_preferences', query, { authorization })
          const [preferences] = response.body.project_preferences
          if (preferences) {
            applySnapshot(self, preferences)
            user.personalization.setTotalClassificationCount(preferences.activity_count)
          }

          self.loadingState = asyncStates.success
          console.log(self.toJSON())
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default UserProjectPreferences