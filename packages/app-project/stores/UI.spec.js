import { expect } from 'chai'

import UI from './UI'

describe('Stores > UI', function () {
  let store

  beforeEach(function () {
    document.cookie = 'mode=; max-age=-99999999;'
    store = UI.create()
  })

  it('should export an object', function () {
    expect(UI).to.be.an('object')
  })

  it('should contain a mode property', function () {
    expect(store.mode).to.be.ok()
  })

  it('should default to the light mode if there is no stored mode in the cookie', function () {
    expect(store.mode).to.equal('light')
  })

  it('should default to the stored mode in the cookie', function () {
    store.setDarkMode()
    store = UI.create()
    expect(store.mode).to.equal('dark')
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
