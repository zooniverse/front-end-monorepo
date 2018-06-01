import { applySnapshot } from 'mobx-state-tree'
import {
  panoptes as panoptesClient,
  projects as projectsClient
} from '@zooniverse/panoptes-js'
import Store from './Store'

let store = null

const client = {
  panoptes: panoptesClient,
  projects: projectsClient.projects
}

function initStore (isServer, snapshot = null) {
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
