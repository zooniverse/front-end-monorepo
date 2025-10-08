import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

export async function addTagVote(tagVote) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`

  const response = await talkAPI.post(
    '/tag_votes',
    { tag_votes: tagVote },
    { authorization }
  )

  const [newTagVote] = response.body.tag_votes
  return newTagVote
}
