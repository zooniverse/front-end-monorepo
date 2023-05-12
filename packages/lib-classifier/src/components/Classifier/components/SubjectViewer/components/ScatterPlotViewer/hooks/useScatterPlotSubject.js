import { getSnapshot } from 'mobx-state-tree'

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
      jsonData = getSnapshot(data)
    } else {
      jsonData = {
        data: getSnapshot(data),
        chartOptions: {}
      }
    }
  }

  return { loading, jsonData, error, viewer }
}