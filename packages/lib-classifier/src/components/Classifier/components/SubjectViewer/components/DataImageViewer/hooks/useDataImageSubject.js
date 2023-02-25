import { findLocationsByMediaType } from '@helpers'
import { useSubjectJSON } from '@hooks'

export default function useDataImageSubject({
  onError,
  onReady,
  subject
}) {
  const { loading, error, data, viewer } = useSubjectJSON({ onError, onReady, subject })
  let JSONData = {
    data: [],
    chartOptions: {}
  }
  let imageLocation = null

  if (data && !loading) {
    JSONData = data
  }

  const locations = findLocationsByMediaType(subject.locations, 'image')
  if (locations?.length > 0) {
    // Presumably 2 image locations will be found
    // The first will be the fallback to display something in Talk
    // Even if there's only one, this is fine
    imageLocation = locations.reverse()[0]
  }

  return { imageLocation, JSONData, loading, viewer }
}