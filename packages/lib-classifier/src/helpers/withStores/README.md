# withStores

Connect a view component to the store, when all you want to do is map some store properties to component props, without any internal state in the connector component.

Usage:
```js
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