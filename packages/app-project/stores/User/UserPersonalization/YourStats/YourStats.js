import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import { env } from '@zooniverse/panoptes-js'

function statsHost(env) {
  console.log('ENV', env)
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

export const statsClient = {
  async fetchDailyStats({ projectId, userId }) {
    const token = await auth.checkBearerToken()
    const Authorization = `Bearer ${token}`
    const stats  = statsHost(env)
    const queryParams = new URLSearchParams({
      period: 'day',
      project_id: projectId
    }).toString()

    const response = await fetch(`${stats}/classifications/users/${userId}?${queryParams}`, { headers: { Authorization } })
    const jsonResponse = await response.json()
    return jsonResponse
  }
}

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
  .actions(self => ({
    increment() {
      self.count = self.count + 1
    }
  }))

const YourStats = types
  .model('YourStats', {
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    thisWeek: types.array(Count),
    total: types.optional(types.number, 0)
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
        let totalCount
        try {
          const statsData = yield statsClient.fetchDailyStats({ projectId: project.id, userId: user.id })
          dailyCounts = statsData.data
          totalCount = statsData.total_count
          self.setLoadingState(asyncStates.success)
        } catch (error) {
          self.handleError(error)
          dailyCounts = []
          total = 0
        }
        self.thisWeek = calculateWeeklyStats(dailyCounts)
        self.total = totalCount
      }),

      handleError(error) {
        console.error(error)
        self.error = error
        self.setLoadingState(asyncStates.error)
      },

      incrementTotal() {
        self.total = self.total + 1
      },

      setLoadingState(state) {
        self.loadingState = state
      },

      reset() {
        const emptyStats = calculateWeeklyStats([])
        self.thisWeek = emptyStats
        self.total = 0
        this.setLoadingState(asyncStates.initialized)
      }
    }
  })

export default YourStats
