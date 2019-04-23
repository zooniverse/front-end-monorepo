import { expect } from 'chai'
import { panoptes } from '@zooniverse/panoptes-js'

import initStore from './initStore'

describe('Stores > initStore', function () {
  it('should export a function', function () {
    expect(initStore).to.be.a('function')
  })

  it('should create a new store when running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(true)
    expect(store2).to.not.equal(store1)
  })

  it('should reuse a store when not running on the server', function () {
    const store1 = initStore(true)
    const store2 = initStore(false)
    expect(store2).to.equal(store1)
  })

  it('should use PanoptesJS if there is no client argument', function () {
    const store = initStore()
    expect(store.client.panoptes).to.deep.equal(panoptes)
  })

  it('should use the client argument if defined', function () {
    const client = {}
    const store = initStore({}, {}, client)
    expect(store.client).to.equal(client)
  })
})
