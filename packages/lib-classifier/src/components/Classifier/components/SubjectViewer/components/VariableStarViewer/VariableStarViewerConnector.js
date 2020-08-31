import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import VariableStarViewerContainer from './VariableStarViewerContainer'

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

function VariableStarViewerConnector(props) {
  const {
    setOnPan,
    setOnZoom,
    subject
  } = useStores()

  return (
    <VariableStarViewerContainer
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subject={subject}
      {...props}
    />
  )
}

export default observer(VariableStarViewerConnector)