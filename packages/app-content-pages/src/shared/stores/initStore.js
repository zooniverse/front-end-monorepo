import { projects as projectsClient } from '@zooniverse/panoptes-js'
import { applySnapshot } from 'mobx-state-tree'

import Store from './Store'

let store = null

const defaultClient = {
  projects: projectsClient
}

function initStore (
  isServer,
  snapshot = null,
  panoptesClient = defaultClient,
) {
  if (isServer) {
    store = Store.create({}, { panoptesClient })
  }

  if (store === null) {
    store = Store.create({}, { panoptesClient })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
