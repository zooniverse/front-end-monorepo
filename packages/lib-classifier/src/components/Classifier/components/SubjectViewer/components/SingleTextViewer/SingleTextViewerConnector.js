import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import SingleTextViewerContainer from './SingleTextViewerContainer'

function useStores () {
  const stores = React.useContext(MobXProviderContext)

  const { active: subject } = stores.classifierStore.subjects

  return {
    subject
  }
}

function SingleTextViewerConnector (props) {
  const {
    subject
  } = useStores()

  return (
    <SingleTextViewerContainer
      subject={subject}
      {...props}
    />
  )
}

export default observer(SingleTextViewerConnector)
