import { arrayOf, func, object, shape, string } from 'prop-types'
import { observer } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import { useEffect } from 'react'

import { useSubjectJSON } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import GeoMapViewer from './GeoMapViewer'

const defaultSubject = {
  id: '',
  locations: []
}

const DEFAULT_HANDLER = () => true

function GeoMapViewerContainer ({
  latest,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject = defaultSubject
}) {
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
  latest: shape({
    annotations: arrayOf(object)
  }),
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    id: string,
    locations: arrayOf(locationValidator)
  })
}

export default observer(GeoMapViewerContainer)
