import { arrayOf, bool, func, number, object, shape, string } from 'prop-types'
import { observer } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { useSubjectJSON } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import GeoMapViewer from './GeoMapViewer'

const defaultSubject = {
  id: '',
  locations: []
}

function GeoMapViewerContainer ({
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
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    id: string,
    locations: arrayOf(locationValidator)
  })
}

export default observer(GeoMapViewerContainer)
