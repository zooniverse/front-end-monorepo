import { talkAPI } from '@zooniverse/panoptes-js'

export default async function postTalkDiscussion (text, title, subject, board, user, authorization) {
  if (!text || !title || !subject || !board || !user || !authorization) return undefined

  const comments = [{
    user_id: user.id,
    body: text,
    focus_id: +subject.id,
    focus_type: 'Subject',
  }]

  const discussions = {
    title: title,
    user_id: user.id,
    subject_default: true,
    board_id: board.id,
    comments: comments,
  }

  return talkAPI.post('/discussions', { discussions }, { authorization })
    .then(response => response)
}
