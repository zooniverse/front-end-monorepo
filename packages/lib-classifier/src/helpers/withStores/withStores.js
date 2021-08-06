import React from 'react'
import { observer } from 'mobx-react'
import useStores from '../useStores'
/**
  Connect a view component to the store, when all you want to do is map some store properties to component props, without any internal state in the connector component.
  Usage:
  ```
  import React from 'react'
  import { withStores } from '@helpers'
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

  export default withStores(DisabledTaskPopup, storeMapper)
  ```
*/
export default function withStores(
  Component,
  storeMapper = store => store
) {

  function ComponentConnector(props) {
    const storeProps = useStores(storeMapper)
    return <Component {...storeProps} {...props} />
  }

  return observer(ComponentConnector)
}