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
  const { data, error, loading, type, viewer } = useSubjectJSON({
    onError,
    onReady,
    subject
  })
  // Eventually, we will determine the geoJSON data from the subject's location, Caesar reductions, other sources, or a combination thereof.
  // Requesting Caesar reductions might look like something like this:
  // const { data: caesarData, error: caesarError, loading: caesarLoading } = useCaesarReductions({ subjectId: subject.id })
  // For now, we are only loading geoJSON data from the subject JSON data, if applicable.

  let geoJSONData = null
  
  if (data && type?.name === 'GeoJSON') {
    geoJSONData = data
  }

  // Initialize the geoDrawing annotation with GeoJSON data
  useEffect(() => {
    const geoAnnotation = latest?.annotations?.find(annotation => annotation.taskType === 'geoDrawing')
    if (geoAnnotation && geoJSONData && geoAnnotation.value.length === 0) {
      geoAnnotation.update([geoJSONData])
    }
  }, [geoJSONData, latest?.annotations])

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <GeoMapViewer
      geoJSON={geoJSONData}
      subjectId={subject.id}
    />
  )
}

GeoMapViewerContainer.propTypes = {
  onError: func,
  onReady: func
}

export default observer(GeoMapViewerContainer)
