import useSWR from 'swr'
import { env, panoptes } from '@zooniverse/panoptes-js'
import logToSentry from '@helpers/logger/logToSentry.js'

import { usePanoptesAuthToken } from '@hooks'
import { getTodayDateString, getNumDaysAgoDateString, getQueryPeriod } from './helpers/dateRangeHelpers.js'

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
async function fetchUserCreatedAt({ token, userID }) {
  const authorization = `Bearer ${token}`
  const userQuery = {
    id: userID
  }
  try {
    const response = await panoptes.get(`/users`, userQuery, { authorization })
    return response.body.users[0].created_at.substring(0, 10)
  } catch (error) {
    console.error('Error loading user with id:', userID)
    logToSentry(error)
  }
  return ''
}

/* Same technique as getDefaultDateRange() in lib-user */
function formatSevenDaysStatsQuery() {
  const todayDateString = getTodayDateString()
  const sevenDaysAgoString = getNumDaysAgoDateString(6)

  const query = {
    end_date: todayDateString,
    period: 'day',
    start_date: sevenDaysAgoString
  }

  return new URLSearchParams(query).toString()
}

/* Similar to getDateInterval() and StatsTabs in lib-user */
function formatAllTimeStatsQuery(userCreatedAt) {
  const todayDateString = getTodayDateString()
  const queryPeriod = getQueryPeriod(todayDateString, userCreatedAt)

  const query = {
    end_date: todayDateString,
    period: queryPeriod,
    start_date: userCreatedAt
  }

  return new URLSearchParams(query).toString()
}

async function fetchStats({ endpoint, projectID, userID, token }) {
  const authorization = `Bearer ${token}`
  const headers = { authorization }
  const host = statsHost(env)

  try {
    const userCreatedAt = await fetchUserCreatedAt({ token, userID })

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
    console.error(error)
    logToSentry(error)
  }
  return null
}

export default function useYourProjectStats({ projectID, userID }) {
  const token = usePanoptesAuthToken()

  // only fetch stats when a userID is available. Don't fetch if no user signed in.
  const key = token && userID ? { endpoint, projectID, userID, token } : null
  return useSWR(key, fetchStats, SWROptions)
}
