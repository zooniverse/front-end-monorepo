import { useSubjectJSON } from '@hooks'

export default function useScatterPlotSubject({
  onError,
  onReady,
  subject
}) {
  const { loading, error, data, viewer } = useSubjectJSON({ onError, onReady, subject })
  let JSONData = {
    data: [],
    chartOptions: {}
  }

  if (data && !loading) {
    if (data.data) {
      JSONData = data
    } else {
      JSONData = {
        data,
        chartOptions: {}
      }
    }
  }

  return { loading, JSONData, error, viewer }
}