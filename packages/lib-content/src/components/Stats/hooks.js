import useSWR from 'swr'

const STATS_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://eras.zooniverse.org'
    : 'https://eras-staging.zooniverse.org'

const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org/api'
    : 'https://panoptes-staging.zooniverse.org/api'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const getClassificationCounts = async () => {
  try {
    const statsResponse = await fetch(`${STATS_HOST}/classifications`)
    const data = await statsResponse.json()
    return data.total_count
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useTotalClassificationCount() {
  return useSWR(
    'eras-classifications-total',
    getClassificationCounts,
    SWROptions
  )
}

const getVolunteerCount = async () => {
  try {
    const response = await fetch(
      `${PANOPTES_HOST}/users?page_size=1&http_cache=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.api+json; version=1'
        }
      }
    )
    const data = await response.json()
    return data.meta.users.count
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useTotalVolunteerCount() {
  return useSWR('total-zooniverse-volunteers', getVolunteerCount, SWROptions)
}
