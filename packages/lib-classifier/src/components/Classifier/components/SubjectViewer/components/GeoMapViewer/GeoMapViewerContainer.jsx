import { Box } from 'grommet'
import { observer } from 'mobx-react'

import { useStores, useSubjectJSON } from '@hooks'
import GeoMapViewer from './GeoMapViewer'

function storeMapper (classifierStore) {
  const {
    subjects: {
      active: subject
    }
  } = classifierStore

  return {
    subject
  }
}

const DEFAULT_HANDLER = () => true

function GeoMapViewerContainer ({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  ...props
}) {
  const { subject } = useStores(storeMapper)
  const { data, loading, error, type } = useSubjectJSON({ onError, onReady, subject})

  console.log('+++ useSubjectJSON:', data, loading, error, type)

  if (loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <Box>
      <GeoMapViewer
        data={data}
      />
      {/* OLD CODE from JSONDAtaViewer:
      <Viewer
        data={data}
        experimentalSelectionTool
        interactionMode={interactionMode}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        subject={subject}
        zoomConfiguration={zoomConfiguration}
        zooming
        {...chartProps}
        {...props}
      />
      */}
    </Box>
  )
}

export default observer(GeoMapViewerContainer)
