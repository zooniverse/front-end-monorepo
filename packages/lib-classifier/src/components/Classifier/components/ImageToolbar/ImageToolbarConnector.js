import React from 'react'
import { withStores } from '@helpers'
import ImageToolbar from './ImageToolbar'

function storeMapper (store) {
  const {
    workflows: {
      active: workflow
    }
  } = store

  return {
    invert: workflow?.configuration?.invert_subject
  }
}

export default withStores(ImageToolbar, storeMapper)
