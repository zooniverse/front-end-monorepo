import { useSubjectJSON } from '@hooks'

export default function useDataImageSubject({
  onError,
  onReady,
  subject
}) {
  const { loading, error, data, viewer } = useSubjectJSON({ onError, onReady, subject })
  let jsonData = {
    data: [],
    chartOptions: {}
  }

  if (data && !loading) {
    jsonData = data
  }

  const imageLocations = subject.locations.filter(location => location.type === 'image')

  return { imageLocations, jsonData, loading, viewer }
}