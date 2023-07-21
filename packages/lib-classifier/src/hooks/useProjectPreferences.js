import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'

import { usePanoptesAuth } from './'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function createProjectPreferences({ endpoint, projectID, authorization }) {
  const data = {
    links: { project: projectID },
    preferences: {}
  }
  const { body } = await panoptes.post(endpoint, { project_preferences: data }, { authorization })
  const [projectPreferences] = body.project_preferences
  return projectPreferences
}

async function fetchProjectPreferences({ endpoint, projectID, userID, authorization }) {
  const { body } = await panoptes.get(endpoint, { project_id: projectID, user_id: userID }, { authorization })
  const [projectPreferences] = body.project_preferences
  return projectPreferences
}

async function fetchOrCreateProjectPreferences({ endpoint, projectID, userID, authorization }) {
  // userID and auth are undefined while loading
  if (userID === undefined || authorization === undefined) {
    return undefined
  }
  // logged-in
  if (projectID && userID && authorization) {
    const projectPreferences = await fetchProjectPreferences({ endpoint, projectID, userID, authorization })
    if (projectPreferences) {
      return projectPreferences
    } else {
      return await createProjectPreferences({ endpoint, projectID, authorization })
    }
  }
  // not logged-in
  return null
}

export default function useProjectPreferences({ authClient, projectID, userID }) {
  const authorization = usePanoptesAuth({ authClient, userID })
  const endpoint = '/project_preferences'
  const key = { endpoint, projectID, userID, authorization }
  return useSWR(key, fetchOrCreateProjectPreferences, SWRoptions)
}
