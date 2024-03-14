import { panoptes } from '@zooniverse/panoptes-js'

export async function createPanoptesUserGroup({ data, authorization }) {
  if (authorization) {
    const response = await panoptes.post('/user_groups', { user_groups: data }, { authorization })
    return response
  }

  return null
}
