import React, { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import DisabledTaskPopup from './DisabledTaskPopup'

function storeMapper (store) {
  const {
    subjects: {
      nextAvailable,
      clearQueue
    }
  } = store

  return {
    nextAvailable,
    reset: clearQueue
  }
}

function DisabledTaskPopupConnector(props) {
  const { classifierStore } = useContext(MobXProviderContext)
  const {
    nextAvailable,
    reset
  } = storeMapper(classifierStore)

  return (
    <DisabledTaskPopup
      nextAvailable={nextAvailable}
      reset={reset}
      {...props}
    />
  )
}

export default observer(DisabledTaskPopupConnector)