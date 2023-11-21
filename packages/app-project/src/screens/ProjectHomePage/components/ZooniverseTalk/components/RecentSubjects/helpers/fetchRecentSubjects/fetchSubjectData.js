import { panoptes } from '@zooniverse/panoptes-js'

async function fetchSubjectData (subjectIds) {
  const response = await panoptes.get('/subjects', {
    id: subjectIds.join(',')
  })
  const { subjects } = response.body
  return subjectIds.map(subjectID => subjects.find(subject => subject.id === subjectID))
}

export default fetchSubjectData
