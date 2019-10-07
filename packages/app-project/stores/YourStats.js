import asyncStates from '@zooniverse/async-states'
import { panoptes } from '@zooniverse/panoptes-js'
import { GraphQLClient } from 'graphql-request'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

export const statsClient = new GraphQLClient('https://graphql-stats.zooniverse.org/graphql')

// https://stackoverflow.com/a/51918448/10951669
function firstDayOfWeek (dateObject, firstDayOfWeekIndex) {
  const dayOfWeek = dateObject.getDay()
  const firstDayOfWeek = new Date(dateObject)
  const diff = dayOfWeek >= firstDayOfWeekIndex
    ? dayOfWeek - firstDayOfWeekIndex
    : 6 - dayOfWeek

  firstDayOfWeek.setDate(dateObject.getDate() - diff)

  return firstDayOfWeek
}

const Count = types
  .model('Count', {
    count: types.number,
    period: types.string
  })

const YourStats = types
  .model('YourStats', {
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    thisWeek: types.array(Count),
    totalCount: types.optional(types.number, 0)
  })

  .volatile(self => ({
    sessionCount: 0
  }))

  .views(self => ({
    get counts () {
      const todaysDate = new Date()
      let today
      try {
        const todaysCount = self.thisWeek.length === 7
          ? self.thisWeek[todaysDate.getDay() - 1].count
          : 0
        today = todaysCount + self.sessionCount
      } catch (error) {
        today = 0
      }

      return {
        today,
        total: self.totalCount
      }
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

    function calculateWeeklyStats (dailyCounts) {
      /*
      Calculate daily stats for this week, starting last Monday.
      */
      const today = new Date()
      const weeklyStats = []
      const monday = firstDayOfWeek(today, 1) // Monday is day number 1 in JavaScript
      for (let day = 0; day < 7; day++) {
        const weekDay = new Date(monday.toISOString())
        const newDate = monday.getDate() + day
        weekDay.setDate(newDate)
        const period = weekDay.toISOString().substring(0, 10)
        const { count } = dailyCounts.find(count => count.period.startsWith(period)) || { count: 0, period }
        weeklyStats.push({
          count,
          period
        })
      }
      return weeklyStats
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
          const response = yield panoptes.get('/project_preferences', query, { authorization })
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
        let dailyCounts
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
              window: "1 Week",
              projectId: "${project.id}",
              userId: "${user.id}"
            ){
              period,
              count
            }
          }`
          const response = yield statsClient.request(query.replace(/\s+/g, ' '))
          dailyCounts = response.statsCount
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
          dailyCounts = []
        }
        self.thisWeek = calculateWeeklyStats(dailyCounts)
      }),

      increment () {
        self.sessionCount = self.sessionCount + 1
        self.totalCount = self.totalCount + 1
      }
    }
  })

export default YourStats
