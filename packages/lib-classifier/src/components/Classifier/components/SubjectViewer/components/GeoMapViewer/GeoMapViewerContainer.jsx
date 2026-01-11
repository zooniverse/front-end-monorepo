import { observer } from 'mobx-react'
import { func } from 'prop-types'
import { useEffect } from 'react'

import { useStores, useSubjectJSON } from '@hooks'
import GeoMapViewer from './GeoMapViewer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      loadingState
    }
  } = classifierStore

  const latest = subject?.stepHistory.latest

  return {
    latest,
    loadingState,
    subject
  }
}

const DEFAULT_HANDLER = () => true

function GeoMapViewerContainer ({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER
}) {
  const { latest, subject } = useStores(storeMapper)
  const { data, error, loading } = useSubjectJSON({
    onError,
    onReady,
    subject
  })

  // Initialize the geoDrawing annotation with loaded GeoJSON data on first load.
  useEffect(() => {
    const geoAnnotation = latest?.annotations?.find(annotation => annotation.taskType === 'geoDrawing')
    if (geoAnnotation && data && geoAnnotation.value.length === 0 && typeof geoAnnotation.update === 'function') {
      geoAnnotation.update([data])
    }
  }, [data, latest?.annotations])

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <GeoMapViewer
      geoJSON={data}
      subjectId={subject.id}
    />
  )
}

GeoMapViewerContainer.propTypes = {
  onError: func,
  onReady: func
}

export default observer(GeoMapViewerContainer)
