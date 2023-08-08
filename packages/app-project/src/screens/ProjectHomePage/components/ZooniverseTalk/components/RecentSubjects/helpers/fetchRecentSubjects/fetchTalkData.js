import { talkAPI } from '@zooniverse/panoptes-js'

async function fetchTalkData (projectId) {
  const query = {
    focus_type: 'Subject',
    page_size: 10,
    section: `project-${projectId}`,
    sort: '-created_at'
  }

  return talkAPI.get('/comments', query)
    .then(response => response.body.comments)
}

export default fetchTalkData
