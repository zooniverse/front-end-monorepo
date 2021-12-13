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
    const initialState = snapshot ?? {}
    // Create a new store for the server-side render.
    store = Store.create(initialState, { client })
    return store
  }

  if (store === null) {
    // create a new store in the browser .
    store = Store.create({}, { client })
  }

  if (snapshot) {
    /*
      Don't overwrite the stored user, collections, recents or stats in the browser.
      Only apply store state that was generated on the server.
    */
    const { project } = snapshot
    applySnapshot(store.project, project)
  }

  return store
}

export default initStore
