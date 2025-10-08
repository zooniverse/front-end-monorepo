import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function removeTagVote(votableTagId) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  await talkAPI.del(`/tag_votes/${votableTagId}`, {}, { authorization })
}
