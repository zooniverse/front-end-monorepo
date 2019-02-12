import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { panoptes, projects } from '@zooniverse/panoptes-js'

import initStore from './initStore'

describe('Stores > initStore', function () {
  it('should export a function', function () {
    expect(initStore).to.be.a('function')
  })

  it('should create a new store when running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(true)
    expect(store2).to.not.eql(store1)
  })

  it('should reuse a store when running on the server', function () {
    const store1 = initStore(false)
    const store2 = initStore(false)
    expect(store2).to.eql(store1)
  })

  it('should contain a project store', function () {
    const store = initStore()
    expect(store.project).to.be.ok
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
    expect(store.project).to.deep.equal(snapshot.project)
  })

  it('should use PanoptesJS if there is no client argument', function () {
    const store = initStore()
    expect(store.client.panoptes).to.deep.equal(panoptes)
    expect(store.client.projects).to.deep.equal(projects)
  })

  it('should use the client argument if defined', function () {
    const client = {}
    const store = initStore({}, {}, client)
    expect(store.client).to.equal(client)
  })
})
