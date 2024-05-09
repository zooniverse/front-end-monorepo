import { panoptes } from '@zooniverse/panoptes-js'

export async function updatePanoptesUserGroup({
  data,
  headers,
  id
}) {
  let response = null
  
  if (headers?.authorization) {
    try {
      response = await panoptes
        .put(`/user_groups/${id}`,
          { user_groups: data },
          headers
        )
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return response
}
