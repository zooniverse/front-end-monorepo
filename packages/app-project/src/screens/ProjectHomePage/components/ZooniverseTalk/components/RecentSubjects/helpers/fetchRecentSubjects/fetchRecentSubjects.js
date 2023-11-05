import fetchSubjectData from './fetchSubjectData'
import fetchTalkData from './fetchTalkData'
import getSubjectIdsFromTalkData from './getSubjectIdsFromTalkData'

async function fetchRecentSubjects ({ projectId }) {
  const talkData = await fetchTalkData(projectId)

  if (talkData.length > 0) {
    const subjectIds = getSubjectIdsFromTalkData(talkData)
    return await fetchSubjectData(subjectIds)
  }

  return []
}

export default fetchRecentSubjects
