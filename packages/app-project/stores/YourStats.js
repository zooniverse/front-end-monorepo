import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'

const YourStats = types
  .model('YourStats', {
    dailyCounts: types.optional(types.array(types.frozen({})), []),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    totalCount: 0
  })

  .views(self => ({
    get todaysCount () {
      return self.dailyCounts[0]
    }
  }))

  .actions(self => {
    let client

    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const { project, user } = getRoot(self)
        if (project.id && user.id) {
          self.fetchActivityCount()
          self.fetchDailyCounts()
        }
      })
      addDisposer(self, projectDisposer)
    }

    return {
      afterAttach () {
        createProjectObserver()
      },

      fetchActivityCount: flow( function * fetchActivityCount () {
        const { project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const authorization = `Bearer ${token}`
          const query = {
            project_id: project.id,
            user_id: user.id
          }
          const response = yield panoptes.get('/project_preferences', query, authorization)
          const [ preferences ] = response.body.project_preferences
          self.totalCount = preferences ? preferences.activity_count: 0
        }
        catch(error) {
          console.log(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      }),

      fetchDailyCounts: flow( function * fetchDailyCounts () {
        const { project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const host = 'https://stats.zooniverse.org'
          const endpoint = '/graphql'
          const authorization = `Bearer ${token}`
          const query = {
            statsCount: {
              eventType: 'classification',
              interval: '1 Day',
              projectId: project.id,
              userId: user.id
            }
          }
          const response = yield panoptes.post(endpoint, query, authorization, host)
          self.loadingState = asyncStates.success
        }
        catch(error) {
          console.log(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      }),

      increment () {
        self.totalCount = self.totalCount + 1
      }
    }
  })

export default YourStats
  