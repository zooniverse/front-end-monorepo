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

function initStore (isServer, snapshot = {}, client = defaultClient) {
  if (isServer) {
    store = Store.create(snapshot, { client })
  }

  if (store === null) {
    store = Store.create(snapshot, { client })
  }

  return store
}

export default initStore
