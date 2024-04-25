import { panoptes } from '@zooniverse/panoptes-js'
import logToSentry from '@helpers/logger/logToSentry.js'

async function fetchSubjectData(subjectIds) {
  let recentlyDiscussedSubjects = []
  try {
    const response = await panoptes.get('/subjects', {
      id: subjectIds.join(',')
    })
    const { subjects } = response.body
    // response does not come back in the same order as subjectIds array
    // so we have to order them correctly here
    recentlyDiscussedSubjects = subjectIds.reduce((acc, id) => {
      // sometimes old subjects have been deleted, but their Talk thread still exists via their subject.id
      const subject = subjects.find(subject => subject.id === id)
      if (subject) {
        acc.push(subject);
      }
      return acc
    }, [])
  } catch (error) {
    logToSentry(error)
  }
  return recentlyDiscussedSubjects
}

export default fetchSubjectData
