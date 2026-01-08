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

function GeoMapViewerContainer ({
  latest,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject = defaultSubject
}) {
  const { data, error, loading } = useSubjectJSON({
    onError,
    onReady,
    subject
  })

  // If there's a geoDrawing annotation, initialize its value with the loaded GeoJSON when available.
  useEffect(() => {
    const geoAnnotation = latest?.annotations?.find(annotation => annotation.taskType === 'geoDrawing')
    if (geoAnnotation && data && Array.isArray(geoAnnotation.value) && geoAnnotation.value.length === 0) {
      geoAnnotation.update([data])
    }
  }, [data, latest])

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  onReady()
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
