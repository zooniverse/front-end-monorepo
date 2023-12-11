import { panoptes } from '@zooniverse/panoptes-js'
import logToSentry from '@helpers/logger/logToSentry.js'

async function fetchSubjectData(subjectIds) {
  try {
    const response = await panoptes.get('/subjects', {
      id: subjectIds.join(',')
    })
    const { subjects } = response.body
    // response does not come back in the same order as subjectIds array
    // so we have to order them correctly here
    const recentlyDiscussedSubjects = subjectIds.reduce((acc, id) => {
      // sometimes old subjects have been deleted, but their Talk thread still exists via their subject.id
      if (subjects.find(subject => subject.id === id)) {
        acc.push(subjects.find(subject => subject.id === id))
      }
      return acc
    }, [])
    return recentlyDiscussedSubjects
  } catch (error) {
    logToSentry(error)
  }
}

export default fetchSubjectData
