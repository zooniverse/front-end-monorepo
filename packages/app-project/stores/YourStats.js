import asyncStates from '@zooniverse/async-states'
import { GraphQLClient } from 'graphql-request'
import _ from 'lodash'
import { flow, getRoot, types } from 'mobx-state-tree'
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
      })
    }
  })

export default YourStats
