import { expect } from 'chai'

import UI from './UI'

describe('Stores > UI', function () {
  let store

  beforeEach(function () {
    store = UI.create()
  })

  it('should export an object', function () {
    expect(UI).to.be.an('object')
  })

  it('should contain a mode property', function () {
    expect(store.mode).to.be.ok()
  })

  it('should default to the light mode', function () {
    expect(store.mode).to.equal('light')
  })

  it('should have a `setDarkMode` action', function () {
    expect(store.mode).to.equal('light')
    store.setDarkMode()
    expect(store.mode).to.equal('dark')
  })

  it('should have a `setLightMode` action', function () {
    expect(store.mode).to.equal('light')
    store.setDarkMode()
    expect(store.mode).to.equal('dark')
    store.setLightMode()
    expect(store.mode).to.equal('light')
  })

  it('should have a `toggleMode` action', function () {
    expect(store.mode).to.equal('light')
    store.toggleMode()
    expect(store.mode).to.equal('dark')
    store.toggleMode()
    expect(store.mode).to.equal('light')
  })
})
