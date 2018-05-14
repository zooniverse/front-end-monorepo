import { applySnapshot } from 'mobx-state-tree'
import Store from './Store'

let store = null

function initStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create()
  }

  if (store === null) {
    store = Store.create()
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
