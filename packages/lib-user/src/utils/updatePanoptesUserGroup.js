import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function updatePanoptesUserGroup({
  data,
  etag,
  id
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  let response = null
  
  try {
    response = await panoptes
      .put(`/user_groups/${id}`,
        { user_groups: data },
        {
          etag,
          authorization
        }
      )
    return response
  } catch (error) {
    console.error(error)
    throw error
  }

  return response
}
