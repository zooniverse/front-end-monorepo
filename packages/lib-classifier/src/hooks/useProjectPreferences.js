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

async function createProjectPreferences({ endpoint, project_id, authorization }) {
  const data = {
    links: { project: project_id },
    preferences: {}
  }
  const { body } = await panoptes.post(endpoint, { project_preferences: data }, { authorization })
  const [projectPreferences] = body.project_preferences
  return projectPreferences
}

async function fetchProjectPreferences({ endpoint, project_id, user_id, authorization }) {
  const { body } = await panoptes.get(endpoint, { project_id, user_id }, { authorization })
  const [projectPreferences] = body.project_preferences
  return projectPreferences
}

async function fetchOrCreateProjectPreferences({ endpoint, project_id, user_id, authorization }) {
  // auth is undefined while loading
  if (authorization === undefined) {
    return undefined
  }
  // logged-in
  if (authorization) {
    const projectPreferences = await fetchProjectPreferences({ endpoint, project_id, user_id, authorization })
    if (projectPreferences) {
      return projectPreferences
    } else {
      return await createProjectPreferences({ endpoint, project_id, authorization })
    }
  }
  // not logged-in
  return null
}

export default function useProjectPreferences(project_id, user_id) {
  const authorization = usePanoptesAuth(user_id)
  const endpoint = '/project_preferences'
  const { data } = useSWR({ endpoint, project_id, user_id, authorization }, fetchOrCreateProjectPreferences, SWRoptions)
  return data
}
