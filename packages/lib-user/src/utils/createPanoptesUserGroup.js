import { panoptes } from "@zooniverse/panoptes-js"

async function createPanoptesGroup({ data, authorization }) {
  if (authorization) {
    const response = await panoptes.post('/user_groups', { user_groups: data }, { authorization })
    return response
  }

  return null
}

export default createPanoptesGroup
