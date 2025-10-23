import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createComment(comment) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const response = await talkAPI.post(
    '/comments',
    { comments: comment },
    { authorization }
  )

  const [newComment] = response.body.comments
  return newComment
}
