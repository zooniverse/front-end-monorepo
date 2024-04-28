import { panoptes } from '@zooniverse/panoptes-js'

export async function updatePanoptesUserGroup({
  data,
  headers
}) {
  if (headers?.authorization) {
    const response = await panoptes
      .put(`/user_groups/${updates.id}`,
        { user_groups: data },
        headers
      )
    return response
  }

  return null
}
