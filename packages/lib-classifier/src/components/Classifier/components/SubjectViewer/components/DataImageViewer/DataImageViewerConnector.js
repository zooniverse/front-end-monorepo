import { useContext } from 'react';
import { MobXProviderContext, observer } from 'mobx-react'
import DataImageViewerContainer from './DataImageViewerContainer'

function useStores() {
  const stores = useContext(MobXProviderContext)

  const {
    active: subject
  } = stores.classifierStore.subjects

  const {
    enableRotation,
    move,
    resetView,
    rotation,
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer

  return {
    enableRotation,
    move,
    resetView,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

function DataImageViewerConnector (props) {
  const {
    enableRotation,
    move,
    resetView,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  } = useStores()

  return (
    <DataImageViewerContainer
      enableRotation={enableRotation}
      move={move}
      resetView={resetView}
      rotation={rotation}
      setOnZoom={setOnZoom}
      setOnPan={setOnPan}
      subject={subject}
      {...props}
    />
  )
}

export default observer(DataImageViewerConnector)