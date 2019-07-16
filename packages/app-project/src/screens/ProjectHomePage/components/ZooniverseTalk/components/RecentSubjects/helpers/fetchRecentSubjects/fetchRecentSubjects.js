import fetchTalkData from './fetchTalkData'
import fetchSubjectData from './fetchSubjectData'
import getSubjectIdsFromTalkData from './getSubjectIdsFromTalkData'

async function fetchRecentSubjects (projectId) {
  const talkData = await fetchTalkData(projectId)
  if (talkData.length > 0) {
    const subjectIds = getSubjectIdsFromTalkData(talkData)
    const subjects = await fetchSubjectData(subjectIds)
      .then(response => response.body.subjects)
    return subjects
  }
  return []
}

export default fetchRecentSubjects
