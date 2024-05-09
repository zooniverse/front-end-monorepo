import auth from 'panoptes-client/lib/auth'
import { panoptes } from '@zooniverse/panoptes-js'

export async function createPanoptesUserGroup({ data }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null
  
  let response = null

  try {
    response = await panoptes.post('/user_groups',
      { user_groups: data },
      { authorization }
    )
    return response
  } catch (error) {
    console.error(error)
    throw error
  }

  return response
}
