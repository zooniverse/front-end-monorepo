import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function updatePanoptesUserGroup({ updates, etag }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  const headers = {
    authorization,
    etag
  }

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
