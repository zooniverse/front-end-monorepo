import createLocationCounts from './createLocationCounts'
import SingleImageViewer from '../components/SingleImageViewer'

function getSubjectViewer (subject, workflow) {
  const counts = createLocationCounts(subject)

  if (counts.total === 1) {
    if (counts.images) {
      return SingleImageViewer
    }
  }

  return null
}

export default getSubjectViewer
