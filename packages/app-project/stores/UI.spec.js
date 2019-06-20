import { expect } from 'chai'
import sinon from 'sinon'

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

  it('should default to the light mode if there is no stored mode in the cookie', function () {
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

  describe('when using the cookie', function () {
    let setCookieSpy
    beforeEach(function () {
      document.cookie = 'mode=; max-age=-99999999;'
      store = UI.create()
      setCookieSpy = sinon.spy(store, 'setCookie')
    })

    afterEach(function () {
      setCookieSpy.resetHistory()
    })

    after(function () {
      setCookieSpy.restore()
    })

    it('should not set the cookie on instantiation', function () {
      expect(setCookieSpy).to.not.have.been.called()
    })

    it('should default to the stored mode in the cookie', function () {
      store.setDarkMode()
      expect(setCookieSpy).to.have.been.calledOnce()
      setCookieSpy.resetHistory()
      store = UI.create()
      expect(store.mode).to.equal('dark')
      expect(setCookieSpy).to.not.have.been.called()
    })

    it('should not update the cookie on instantiation if there is already one', function () {
      document.cookie = 'mode=light; path=/; domain=zooniverse.org; max-age=31536000'
      store = UI.create()
      expect(setCookieSpy).to.not.have.been.called()
    })

    it('should update the cookie if the store mode does not equal the stored cookie mode', function () {
      store.setLightMode()
      expect(setCookieSpy).to.not.have.been.called()
      store.setDarkMode()
      expect(setCookieSpy).to.have.been.calledOnce()
    })
  })
})
