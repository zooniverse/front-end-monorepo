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
  } = stores.classifierStore.subjectViewer

  return {
    move,
    subject
  }
}

function SingleVideoViewerConnector(props) {
  const {
    move,
    subject
  } = useStores()

  return (
    <SingleVideoViewerContainer
      move={move}
      subject={subject}
      {...props}
    />
  )
}

export default observer(SingleVideoViewerConnector)