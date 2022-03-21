import { addDisposer, applySnapshot, onSnapshot } from 'mobx-state-tree'
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

function persistSnapshots(storageKey, store, storage) {
  function _saveSnapshot(snapshot) {
    const data = JSON.stringify(snapshot)
    storage.setItem(storageKey, data)
  }
  const snapshotDisposer = onSnapshot(store, _saveSnapshot)
  return addDisposer(store, snapshotDisposer)
}

function loadSnapshot(storageKey, storage) {
  try {
    const stringData = storage.getItem(storageKey)
    const snapshot = JSON.parse(stringData)
    // Stored items are null by default but null isn't a valid snapshot.
    return  snapshot || {}
  } catch (error) {
    console.info(`Unable to load ${storageKey}`)
    console.error(error)
  }
}

function initStore (isServer, snapshot = null, client = defaultClient) {
  // create a store during SSR
  if (isServer) {
    const initialState = snapshot || {}
    // Create a new store for the server-side render.
    store = Store.create(initialState, { client })
    return store
  }

  // create a store in the browser
  if (store === null) {
    const userKey = 'panoptes-user'
    const initialState = snapshot || {}
    if (window.sessionStorage) {
       initialState.user = loadSnapshot(userKey, window.sessionStorage)
    }
    // create a new store in the browser .
    store = Store.create(initialState, { client })
    if (window.sessionStorage) {
      persistSnapshots(userKey, store.user, window.sessionStorage)
    }
    return store
  }

  if (snapshot) {
    /*
      Don't overwrite the stored user, collections, recents or stats in the browser.
      Only apply store state that was generated on the server.
      TODO: won't this overwrite local changes to the UI store?
    */
    const { project } = snapshot
    applySnapshot(store.project, project)
  }

  return store
}

// useful for starting tests with a clean store
export function cleanStore() {
  store = null
}

export default initStore
