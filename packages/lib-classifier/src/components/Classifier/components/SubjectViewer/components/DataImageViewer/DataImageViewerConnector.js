import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import DataImageViewerContainer from './DataImageViewerContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const {
    active: subject
  } = stores.classifierStore.subjects

  const {
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer

  return {
    setOnZoom,
    setOnPan,
    subject
  }
}

function DataImageViewerConnector (props) {
  const {
    setOnZoom,
    setOnPan,
    subject
  } = useStores()

  return (
    <DataImageViewerContainer
      setOnZoom={setOnZoom}
      setOnPan={setOnPan}
      subject={subject}
      {...props}
    />
  )
}

export default observer(DataImageViewerConnector)