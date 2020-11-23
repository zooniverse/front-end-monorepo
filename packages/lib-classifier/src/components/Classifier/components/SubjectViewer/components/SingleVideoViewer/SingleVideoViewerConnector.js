import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import SingleVideoViewerContainer from './SingleVideoViewerContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const {
    active: subject
  } = stores.classifierStore.subjects

  const {
    move,
    rotation
  } = stores.classifierStore.subjectViewer

  return {
    move,
    rotation,
    subject
  }
}

function SingleVideoViewerConnector(props) {
  const {
    move,
    rotation,
    subject
  } = useStores()

  return (
    <SingleVideoViewerContainer
      move={move}
      rotation={rotation}
      subject={subject}
      {...props}
    />
  )
}

export default observer(SingleVideoViewerConnector)