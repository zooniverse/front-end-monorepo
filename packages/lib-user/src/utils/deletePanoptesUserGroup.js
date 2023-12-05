import { panoptes } from '@zooniverse/panoptes-js'

async function deletePanoptesGroup({ groupID, headers }) {
  if (headers?.authorization) {
    const response = await panoptes.del(`/user_groups/${groupID}`, {}, headers)
    return response
  }

  return null
}

export default deletePanoptesGroup
