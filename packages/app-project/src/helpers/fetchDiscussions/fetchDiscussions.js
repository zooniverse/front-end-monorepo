import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'

async function fetchDiscussions({ query }) {
  const token = await auth.checkBearerToken()
  const authorization = token ? `Bearer ${token}` : ''

  try {
    const { body } = await talkAPI.get('/discussions', query, { authorization })
    return body.discussions || []
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchDiscussions
