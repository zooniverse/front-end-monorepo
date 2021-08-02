import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '@helpers'
import DisabledTaskPopup from './DisabledTaskPopup'

function storeMapper(store) {
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
  const {
    nextAvailable,
    reset
  } = useStores(storeMapper)

  return (
    <DisabledTaskPopup
      nextAvailable={nextAvailable}
      reset={reset}
      {...props}
    />
  )
}

export default observer(DisabledTaskPopupConnector)