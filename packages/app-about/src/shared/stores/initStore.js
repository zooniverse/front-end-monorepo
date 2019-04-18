import { applySnapshot } from 'mobx-state-tree'
import {
  panoptes as panoptesClient
} from '@zooniverse/panoptes-js'
import { createClient as createContentfulClient } from 'contentful'

import Store from './Store'

let store = null

const defaultClient = {
  panoptes: panoptesClient
}

// These default to 'blank' in order to allow the tests to pass
const defaultContentfulClient = createContentfulClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'blank',
  space: process.env.CONTENTFUL_SPACE || 'blank'
})

function initStore (isServer, snapshot = null, client = defaultClient, contentfulClient = defaultContentfulClient) {
  if (isServer) {
    store = Store.create({}, { client, contentfulClient })
  }

  if (store === null) {
    store = Store.create({}, { client, contentfulClient })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
