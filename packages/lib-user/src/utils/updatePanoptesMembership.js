import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function updatePanoptesMembership({
  membershipId,
  data
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  const membershipResponse = await panoptes.get(`/memberships/${membershipId}`, {}, { authorization })

  const headers = {
    authorization,
    etag: membershipResponse?.headers?.etag
  }
  
  try {
    const response = await panoptes
      .put(`/memberships/${membershipId}`,
        { memberships: data },
        headers
      )
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
