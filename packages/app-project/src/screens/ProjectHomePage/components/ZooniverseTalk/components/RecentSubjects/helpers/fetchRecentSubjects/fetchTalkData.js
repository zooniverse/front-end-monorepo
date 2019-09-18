import { panoptes } from '@zooniverse/panoptes-js'

async function fetchTalkData (projectId) {
  const query = {
    focus_type: 'Subject',
    page_size: 10,
    section: `project-${projectId}`,
    sort: '-created_at'
  }

  return panoptes.get('/comments', query, {}, process.env.TALK_HOST)
    .then(response => response.body.comments)
}

export default fetchTalkData
