import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function createVotableTag(votableTag) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const response = await talkAPI.post(
    '/votable_tags',
    { votable_tags: votableTag },
    { authorization }
  )

  const [newVotableTag] = response.body.votable_tags
  return newVotableTag
}
