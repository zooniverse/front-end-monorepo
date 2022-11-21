import asyncStates from '@zooniverse/async-states'
import { GraphQLClient } from 'graphql-request'
import { flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

export const statsClient = new GraphQLClient('https://graphql-stats.zooniverse.org/graphql')

// https://stackoverflow.com/a/51918448/10951669
function firstDayOfWeek (dateObject, firstDayOfWeekIndex) {
  const dayOfWeek = dateObject.getUTCDay()
  const firstDayOfWeek = new Date(dateObject)
  const diff = dayOfWeek >= firstDayOfWeekIndex
    ? dayOfWeek - firstDayOfWeekIndex
    : 6 - dayOfWeek

  firstDayOfWeek.setUTCDate(dateObject.getUTCDate() - diff)

  return firstDayOfWeek
}

const Count = types
  .model('Count', {
    count: types.number,
    dayNumber: types.number,
    period: types.string
  })

const YourStats = types
  .model('YourStats', {
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    thisWeek: types.array(Count),
  })

  .actions(self => {
    function calculateWeeklyStats (dailyCounts) {
      /*
      Calculate daily stats for this week, starting last Monday.
      */
      const today = new Date()
      const weeklyStats = []
      const monday = firstDayOfWeek(today, 1) // Monday is day number 1 in JavaScript
      for (let day = 0; day < 7; day++) {
        const weekDay = new Date(monday.toISOString())
        const newDate = monday.getUTCDate() + day
        weekDay.setUTCDate(newDate)
        const period = weekDay.toISOString().substring(0, 10)
        const { count } = dailyCounts.find(count => count.period.startsWith(period)) || { count: 0, period }
        const dayNumber = weekDay.getDay()
        weeklyStats.push({
          count,
          dayNumber,
          period
        })
      }
      return weeklyStats
    }

    return {
      fetchDailyCounts: flow(function * fetchDailyCounts () {
        const { project, user } = getRoot(self)
        self.setLoadingState(asyncStates.loading)
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
          self.setLoadingState(asyncStates.success)
        } catch (error) {
          self.handleError(error)
          dailyCounts = []
        }
        self.thisWeek = calculateWeeklyStats(dailyCounts)
      }),

      handleError(error) {
        console.error(error)
        self.error = error
        self.setLoadingState(asyncStates.error)
      },

      setLoadingState(state) {
        self.loadingState = state
      },

      reset() {
        const emptyStats = calculateWeeklyStats([])
        self.thisWeek = emptyStats
        this.setLoadingState(asyncStates.initialized)
      }
    }
  })

export default YourStats
