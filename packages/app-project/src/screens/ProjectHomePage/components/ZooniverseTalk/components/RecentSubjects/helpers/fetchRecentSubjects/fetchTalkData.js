import talkClient from 'panoptes-client/lib/talk-client'

async function fetchTalkData (projectId) {
  return talkClient.type('comments')
    .get({
      focus_type: 'Subject',
      page_size: 10,
      section: `project-${projectId}`,
      sort: '-created_at'
    })
}

export default fetchTalkData
