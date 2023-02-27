import { useSubjectJSON } from '@hooks'

export default function useScatterPlotSubject({
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
    if (data.data) {
      jsonData = data
    } else {
      jsonData = {
        data,
        chartOptions: {}
      }
    }
  }

  return { loading, jsonData, error, viewer }
}