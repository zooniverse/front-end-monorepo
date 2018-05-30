import { applySnapshot } from 'mobx-state-tree'
import { panoptes } from '@zooniverse/panoptes-js'
import Store from './Store'

let store = null

function initStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({}, { client: panoptes })
  }

  if (store === null) {
    store = Store.create({}, { client: panoptes })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
