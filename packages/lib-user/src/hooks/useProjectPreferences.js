import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from './usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchUserProjectPreferences({ page, pageSize, token, userID }) {
  const authorization = token ? `Bearer ${token}` : undefined

  try {
    const query = {
      sort: '-updated_at',
      user_id: userID,
      page,
      page_size: pageSize
    }
    const response = await panoptes.get('/project_preferences', query, {
      authorization
    })

    // grab the project ids in sort order from /project_preferences
    // but only if the user actually made a classification
    const recentProjectIds = response.body?.project_preferences?.map(preference => {
        return preference.links.project // project id as a string
    }).filter(id => id) // just in case, make sure there's no empty spots in the recentProjectIds array

    const numProjects = response.body.meta?.project_preferences?.count

    return { numProjects, recentProjectIds }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function useProjectPreferences({ page, pageSize, userID }) {
  const token = usePanoptesAuthToken()
  let key = null
  if (userID) {
    key = { page, pageSize, token, userID }
  }
  return useSWR(key, fetchUserProjectPreferences, SWROptions)
}
