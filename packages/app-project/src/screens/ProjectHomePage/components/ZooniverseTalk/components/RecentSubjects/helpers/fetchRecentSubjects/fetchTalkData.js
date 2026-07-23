import { talkAPI } from '@zooniverse/panoptes-js'

// Requesting 10 recent comments, but only using the first 4 unique subject IDs from those comments in getSubjectIdsFromTalkData.js. The 10 comments are requested to increase the chance of getting 4 unique subject IDs, since some comments may reference the same subject.

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
