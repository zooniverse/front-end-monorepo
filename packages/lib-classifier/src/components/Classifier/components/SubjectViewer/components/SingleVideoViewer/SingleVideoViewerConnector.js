import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import SingleVideoViewerContainer from './SingleVideoViewerContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const {
    active: subject
  } = stores.classifierStore.subjects

  const {
    enableRotation,
    move,
    rotation,
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer

  return {
    enableRotation,
    move,
    rotation,
    setOnZoom,
    setOnPan,
    subject
  }
}

function SingleVideoViewerConnector(props) {
  const {
    enableRotation,
    move,
    rotation,
    setOnPan,
    setOnZoom,
    subject
  } = useStores()

  return (
    <SingleVideoViewerContainer
      enableRotation={enableRotation}
      move={move}
      rotation={rotation}
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subject={subject}
      {...props}
    />
  )
}

export default observer(SingleVideoViewerConnector)