import { panoptes } from '@zooniverse/panoptes-js'

export async function deletePanoptesUserGroup({ groupID, headers }) {
  if (headers?.authorization) {
    const response = await panoptes.del(`/user_groups/${groupID}`, {}, headers)
    return response
  }

  return null
}
