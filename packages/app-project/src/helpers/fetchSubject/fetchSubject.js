import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'

async function fetchSubjectData(subjectID, env) {
  const { headers, host } = getServerSideAPIHost(env)
  try {
    const query = {
      env,
      id: subjectID
    }
    const response = await panoptes.get('/subjects', query, { ...headers }, host)
    const [ subject ] = response.body.subjects
    return subject
  } catch (error) {
    console.error('Error loading subject:', error)
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
