import { projects as projectsClient } from '@zooniverse/panoptes-js'
import { applySnapshot } from 'mobx-state-tree'
import { createClient as createContentfulClient } from 'contentful'

import Store from './Store'

let store = null

const defaultClient = {
  projects: projectsClient
}

// These default to 'blank' in order to allow the tests to pass
const defaultContentfulClient = createContentfulClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'blank',
  space: process.env.CONTENTFUL_SPACE_ID || 'blank'
})

function initStore (
  isServer,
  snapshot = null,
  panoptesClient = defaultClient,
  contentfulClient = defaultContentfulClient
) {
  if (isServer) {
    store = Store.create({}, { panoptesClient, contentfulClient })
  }

  if (store === null) {
    store = Store.create({}, { panoptesClient, contentfulClient })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export default initStore
