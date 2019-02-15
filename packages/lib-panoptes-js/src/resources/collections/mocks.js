const { buildResponse } = require('../../utilityFunctions')

const collection = {
  created_at: '2015-03-17T13:45:40.297Z',
  description: '',
  display_name: 'test collection',
  external_id: null,
  favorite: false,
  href: '/collections/1',
  id: '1',
  links: {
    projects: ['1'],
    subjects: ['1']
  },
  private: true,
  updated_at: '2015-03-17T13:45:40.297Z'
}

const collections = [
  collection,
  Object.assign({}, collection, { id: '2' })
]

const resources = {
  collection,
  collections
}

const collectionResponse = buildResponse('get', 'collections', [resources.collection], {})
const collectionsResponse = buildResponse('get', 'collections', resources.collections, {})

const responses = {
  get: {
    collection: collectionResponse,
    collections: collectionsResponse
  }
}

module.exports = {
  resources,
  responses
}
