import { panoptes } from '@zooniverse/panoptes-js'

export async function updatePanoptesUserGroup({
  data,
  headers,
  id
}) {
  if (headers?.authorization) {
    const response = await panoptes
      .put(`/user_groups/${id}`,
        { user_groups: data },
        headers
      )
    return response
  }

  return null
}
