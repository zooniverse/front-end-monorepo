import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function updatePanoptesUserGroup(key, {
  arg: {
    groupId,
    data
  }
}) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  const groupResponse = await panoptes.get(`/user_groups/${groupId}`, {}, { authorization })

  const headers = {
    authorization,
    etag: groupResponse?.headers?.etag
  }
  
  try {
    const { body } = await panoptes
      .put(`/user_groups/${groupId}`,
        { user_groups: data },
        headers
      )
    const { user_groups } = body
    const user_group = user_groups?.[0]
    return user_group
  } catch (error) {
    console.error(error)
    throw error
  }
}
