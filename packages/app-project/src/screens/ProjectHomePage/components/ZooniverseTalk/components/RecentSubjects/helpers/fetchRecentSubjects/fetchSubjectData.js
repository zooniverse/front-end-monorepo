import { panoptes } from '@zooniverse/panoptes-js'

async function fetchSubjectData (subjectIds) {
  return panoptes.get('/subjects', {
    id: subjectIds.join(',')
  })
}

export default fetchSubjectData
