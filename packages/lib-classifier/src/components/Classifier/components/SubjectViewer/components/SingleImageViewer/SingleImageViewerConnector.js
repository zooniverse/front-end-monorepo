import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import SingleImageViewerContainer from './SingleImageViewerContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const { active: subject } = stores.classifierStore.subjects

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

function SingleImageViewerConnector(props) {
  const {
    enableRotation,
    move,
    rotation,
    setOnPan,
    setOnZoom,
    subject
  } = useStores()

  return (
    <SingleImageViewerContainer
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

export default observer(SingleImageViewerConnector)
