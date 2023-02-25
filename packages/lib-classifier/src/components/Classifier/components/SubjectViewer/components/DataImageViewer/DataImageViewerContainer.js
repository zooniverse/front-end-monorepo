import { useState } from 'react'
import PropTypes from 'prop-types'
import locationValidator from '../../helpers/locationValidator'
import DataImageViewer from './DataImageViewer'
import { useDataImageSubject } from './hooks'

const DEFAULT_HANDLER = () => true
const SUBJECT = {
  id: '',
  locations: []
}

export default function DataImageViewerContainer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject = SUBJECT,
  viewerConfiguration,
  ...rest
}) {
  const [allowPanZoom, setAllowPanZoom] = useState('')
  const { imageLocation, JSONData, loading, viewer } = useDataImageSubject({ onError, onReady, subject })

  if (!subject.id) {
    return null
  }

  const zoomConfiguration = JSONData.chartOptions?.zoomConfiguration || viewerConfiguration?.zoomConfiguration

  return (
    <DataImageViewer
      allowPanZoom={allowPanZoom}
      imageLocation={imageLocation}
      ref={viewer}
      JSONData={JSONData}
      setAllowPanZoom={setAllowPanZoom}
      zoomConfiguration={zoomConfiguration}
      {...rest}
    />
  )
}

DataImageViewerContainer.propTypes = {
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

