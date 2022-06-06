import { talkAPI } from '@zooniverse/panoptes-js'

export default async function getTalkDiscussion (board, title) {
  if (!board || !title) return undefined

  const query = {
    board_id: board.id,
    title: title,
    subject_default: true,
  }

  return talkAPI.get('/discussions', query)
    .then(response => response?.body?.discussions?.[0])
}
