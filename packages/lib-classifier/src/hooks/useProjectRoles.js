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

async function fetchProjectRoles({ endpoint, projectID, userID, authorization }) {
  if (authorization) {
    const { body } = await panoptes.get(endpoint, { project_id: projectID, user_id: userID }, { authorization })
    const [projectRoles] = body.project_roles
    return projectRoles.roles
  }
  return []
}

export default function useProjectRoles({ authClient, projectID, userID }) {
  const authorization = usePanoptesAuth({ authClient, userID })
  const endpoint = '/project_roles'
  const { data } = useSWR({ endpoint, projectID, userID, authorization }, fetchProjectRoles, SWRoptions)
  return data ?? []
}
