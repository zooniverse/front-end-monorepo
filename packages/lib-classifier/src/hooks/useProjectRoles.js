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

async function fetchProjectRoles({ project_id, user_id, authorization }) {
  if (authorization) {
    const { body } = await panoptes.get(`/project_roles`, { project_id, user_id }, { authorization })
    const [projectRoles] = body.project_roles
    return projectRoles.roles
  }
  return []
}

export default function useProjectRoles(project_id, user_id) {
  const authorization = usePanoptesAuth(user_id)
  const { data } = useSWR({ project_id, user_id, authorization }, fetchProjectRoles, SWRoptions)
  return data ?? []
}
