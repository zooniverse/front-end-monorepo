import useSWR from 'swr'
import { usePanoptesAuth } from '@hooks'
import { env, panoptes } from '@zooniverse/panoptes-js'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'


const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function statsHost(env) {
  switch (env) {
    case 'production':
      return 'https://eras.zooniverse.org'
    default:
      return 'https://eras-staging.zooniverse.org'
  }
}

const endpoint = '/classifications/users'

/* user.created_at is needed for allTimeQuery, and not always available on the logged in user object */
async function fetchUserCreatedAt(userID) {
  const { headers, host } = getServerSideAPIHost(env)
  const userQuery = {
    env,
    id: userID
  }
  try {
    const response = await panoptes.get(`/users`, userQuery, { ...headers }, host)
    if (response.ok) {
      return response.body.users[0].created_at.substring(0, 10)
    }
  } catch (error) {
    console.error('Error loading user with id:', userID)
    logToSentry(error)
  }
}

/* Same technique as getDefaultDateRange() in lib-user */
function formatSevenDaysStatsQuery() {
  const today = new Date()
  const todayDateString = today.toISOString().substring(0, 10)

  const defaultStartDate = new Date()
  const sevenDaysAgo = defaultStartDate.getUTCDate() - 6
  defaultStartDate.setUTCDate(sevenDaysAgo)
  const endDateString = defaultStartDate.toISOString().substring(0, 10)

  const query = {
    end_date: todayDateString, // "Today" in UTC Timezone
    period: 'day',
    start_date: endDateString // 7 Days ago
  }

  const statsQuery = new URLSearchParams(query).toString()
  return statsQuery
}

/* Similar to getDateInterval() and StatsTabs in lib-user */
function formatAllTimeStatsQuery(userCreatedAt) {
  const today = new Date()
  const todayDateString = today.toISOString().substring(0, 10)

  let queryPeriod
  const differenceInDays = (new Date(todayDateString) - new Date(userCreatedAt)) / (1000 * 60 * 60 * 24)
  if (differenceInDays <= 31) queryPeriod = 'day'
  else if (differenceInDays <= 183) queryPeriod = 'week'
  else if (differenceInDays <= 1460) queryPeriod = 'month'
  else queryPeriod = 'year'

  const query = {
    end_date: todayDateString,
    period: queryPeriod,
    start_date: userCreatedAt
  }

  const statsQuery = new URLSearchParams(query).toString()
  return statsQuery
}

async function fetchStats({ endpoint, projectID, userID, authorization }) {
  const headers = { authorization }
  const host = statsHost(env)

  try {
    const userCreatedAt = await fetchUserCreatedAt(userID)

    const sevenDaysQuery = formatSevenDaysStatsQuery()
    const allTimeQuery = formatAllTimeStatsQuery(userCreatedAt)

    const sevenDaysResponse = await fetch(`${host}${endpoint}/${userID}/?${sevenDaysQuery}&project_id=${projectID}`, { headers })
    const sevenDaysStats = await sevenDaysResponse.json()

    const allTimeResponse = await fetch(`${host}${endpoint}/${userID}/?${allTimeQuery}&project_id=${projectID}`, { headers })
    const allTimeStats = await allTimeResponse.json()

    return {
      sevenDaysStats,
      allTimeStats
    }
  } catch (error) {
    console.error('Error fetching stats', error)
    logToSentry(error)
  }
}

export default function useYourProjectStats({ projectID, userID }) {
  const authorization = usePanoptesAuth(userID)

  // only fetch stats when a userID is available. Don't fetch if no user logged in.
  const key = authorization && userID ? { endpoint, projectID, userID, authorization } : null
  return useSWR(key, fetchStats, SWROptions)
}
