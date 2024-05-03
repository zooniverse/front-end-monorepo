import { panoptes } from '@zooniverse/panoptes-js'

export async function createPanoptesUserGroup({
  data,
  authorization
}) {
  let response = null

  if (authorization) {
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
  }

  return response
}
