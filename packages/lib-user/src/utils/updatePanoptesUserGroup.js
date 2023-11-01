import { panoptes } from "@zooniverse/panoptes-js"

async function updatePanoptesUserGroup({ updates, headers }) {
  if (headers?.authorization) {
    const response = await panoptes
      .put(`/user_groups/${updates.id}`,
        {
          user_groups: {
            display_name: updates.display_name,
            name: updates.name
          }
        },
        headers
      )
    return response
  }

  return null
}

export default updatePanoptesUserGroup
