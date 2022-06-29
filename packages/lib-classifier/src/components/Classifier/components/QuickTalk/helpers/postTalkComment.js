import { talkAPI } from '@zooniverse/panoptes-js'

export default async function postTalkComment (text, discussion, user, authorization) {
  if (!text || !discussion || !user || !authorization) return undefined

  const comments = {  // Yes, plural, even though it's one comment
    user_id: user.id,
    body: text,
    discussion_id: +discussion.id,
  }

  const response = await talkAPI.post('/comments', { comments }, { authorization })
  if (response?.body?.comments) {
    const [comment] = response.body.comments
    return comment
  }
  return null
}
