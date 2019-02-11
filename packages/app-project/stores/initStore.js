import { applySnapshot } from 'mobx-state-tree'
import {
  collections as collectionsClient,
  panoptes as panoptesClient,
  projects as projectsClient
} from '@zooniverse/panoptes-js'
import Store from './Store'

let store = null

const defaultClient = {
  collections: collectionsClient,
  panoptes: panoptesClient,
  projects: projectsClient
}

function initStore (isServer, snapshot = null, client = defaultClient) {
  if (isServer) {
    store = Store.create({}, { client })
  }

  if (store === null) {
    store = Store.create({}, { client })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
