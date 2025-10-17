import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createDiscussion(discussion) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const response = await talkAPI.post(
    '/discussions',
    { discussions: discussion },
    { authorization }
  )

  const [newDiscussion] = response.body.discussions
  return newDiscussion
}
