import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'

/* See lib-user useUserStats hook. If those env + host options
are moved to lib-panoptes-js config files, then this could be too */
const statsHost = 'https://eras.zooniverse.org'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const getClassificationCounts = async () => {
  try {
    const statsResponse = await fetch(`${statsHost}/classifications`)
    const data = await statsResponse.json()
    return data.total_count
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useTotalClassificationCount() {
  return useSWR('eras-classifications-total', getClassificationCounts, SWROptions)
}

const getVolunteerCount = async () => {
  try {
    const query = { page_size: 1 } // will return one account in { users }, but we really only care about { meta }
    const response = await panoptes.get('/users', query)
    return response.body.meta.users.count
  } catch (error) {
    console.log(error)
    return null
  }
}

export function useTotalVolunteerCount() {
  return useSWR('total-zooniverse-volunteers', getVolunteerCount, SWROptions)
}
