import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import { GraphQLClient } from 'graphql-request'
import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'

export const statsClient = new GraphQLClient('https://stats.zooniverse.org/graphql')

const YourStats = types
  .model('YourStats', {
    dailyCounts: types.array(types.frozen({})),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    totalCount: types.optional(types.number, 0)
  })

  .views(self => ({
    get todaysCount () {
      return self.dailyCounts[0]
    }
  }))

  .actions(self => {
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

      fetchActivityCount: flow(function * fetchActivityCount () {
        const { project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const authorization = `Bearer ${token}`
          const query = {
            project_id: project.id,
            user_id: user.id
          }
          // TODO: this should really share the UPP that's being requested by the classifier.
          const response = yield panoptes.get('/project_preferences', query, authorization)
          const [ preferences ] = response.body.project_preferences
          self.totalCount = preferences ? preferences.activity_count : 0
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      }),

      fetchDailyCounts: flow(function * fetchDailyCounts () {
        const { project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const Authorization = `Bearer ${token}`
          statsClient.setHeaders({
            Authorization
          })
          const query = `{
            statsCount(
              eventType: "classification",
              interval: "1 Day",
              projectId: "${project.id}",
              userId: "${user.id}"
            ){
              period,
              count
            }
          }`
          const response = yield statsClient.request(query.replace(/\s+/g, ' '))
          self.dailyCounts = response.statsCount
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
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
