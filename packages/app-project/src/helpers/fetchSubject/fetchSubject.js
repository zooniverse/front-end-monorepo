import { panoptes } from '@zooniverse/panoptes-js'
import logToSentry from '@helpers/logger/logToSentry.js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'

async function fetchSubjectData(subjectID, env) {
  const { headers, host } = getServerSideAPIHost(env)
  
  const query = {
    env,
    id: subjectID,
    include: 'attached_images'
  }
  
  try {
    const response = await panoptes.get('/subjects', query, { ...headers }, host)
    const [ subject ] = response.body.subjects
    if (subject) {
      subject.attached_media = response.body.linked?.media?.filter(media => media.media_type === 'subject_attached_image') || []
    }
    return subject
  } catch (error) {
    console.error('Error loading subject:', error)
    logToSentry(error, { query, host })
    return null
  }
}

async function fetchSubject(subjectID, env) {
  const subject = await fetchSubjectData(subjectID, env)
  
  if (!subject) return null

  return {
    ...subject
  }
}

export default fetchSubject
