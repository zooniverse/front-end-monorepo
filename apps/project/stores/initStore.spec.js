import initStore from './initStore'
import asyncStates from '../helpers/asyncStates'
import { panoptes, projects } from '@zooniverse/panoptes-js'

describe('Stores > initStore', function () {
  it('should export a function', function () {
    initStore.should.be.a('function')
  })

  it('should create a new store when running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(true)
    store2.should.not.equal(store1)
  })

  it('should reuse a store when running on the server', function () {
    const store1 = initStore(false)
    const store2 = initStore(false)
    store2.should.equal(store1)
  })

  it('should contain a project store', function () {
    const store = initStore()
    store.project.should.exist
  })

  it('should apply a snapshot when provided', function () {
    const snapshot = {
      project: {
        loadingState: asyncStates.initialized,
        displayName: 'foobar',
        error: null,
        id: '12345'
      }
    }
    const store = initStore(true, snapshot)
    store.should.deep.equal(snapshot)
  })

  it('should use PanoptesJS if there is no client argument', function () {
    const store = initStore()
    store.client.panoptes.should.deep.equal(panoptes)
    store.client.projects.should.deep.equal(projects)
  })

  it('should use the client argument if defined', function () {
    const client = {}
    const store = initStore({}, {}, client)
    store.client.should.equal(client)
  })
})
