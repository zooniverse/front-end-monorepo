import { panoptes } from '@zooniverse/panoptes-js'

export async function deletePanoptesUserGroup({ groupId, headers }) {
  if (headers?.authorization) {
    const response = await panoptes.del(`/user_groups/${groupId}`, {}, headers)
    return response
  }

  return null
}
