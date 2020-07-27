import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import DataImageViewerContainer from './DataImageViewerContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const {
    active: subject
  } = stores.classifierStore.subjects

  return { subject }
}

function DataImageViewerConnector (props) {
  const { subject } = useStores()

  return (
    <DataImageViewerContainer subject={subject} {...props} />
  )
}

export default observer(DataImageViewerConnector)