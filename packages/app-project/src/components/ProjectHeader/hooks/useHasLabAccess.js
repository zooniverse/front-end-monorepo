/*
useHasLabAccess() hook
Determines if a user has access to a project's Lab (aka Project Builder) page
(e.g. https://www.zooniverse.org/lab/1292)

- Input: project ID, user ID
- Output: true if the user is either the project owner, or a project collaborator; false otherwise.
 */

import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'
import { usePanoptesAuthToken } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchProjectRoles({ token, projectId, userId }) {
  const authorization = `Bearer ${token}`
  const { body } = await panoptes.get(
    '/project_roles',
    { project_id: projectId, user_id: userId },
    { authorization }
  )
  const [projectRoles] = body?.project_roles || []
  return projectRoles?.roles || []
}

export default function useHasLabAccess(projectId, userId) {
  const token = usePanoptesAuthToken()
  const key = token && projectId && userId
    ? { token, projectId, userId }
    : null
  const { data: roles } = useSWR(key, fetchProjectRoles, SWRoptions)

  if (!roles) return false
  return roles.includes('owner') || roles.includes('collaborator')
}
