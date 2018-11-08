import sinon from 'sinon'
import { observable } from 'mobx'
import OAuthStore from './OAuthStore'
import CredentialsStore from './CredentialsStore'
import UIStore from './UIStore'

const CREDENTIALS = {
  expiresAt: 123456789,
  token: 'foobar'
}

const DEFAULT_CREDENTIALS = {
  expiresAt: 0,
  token: ''
}

describe.only('Model > CredentialsStore', function () {
  let credentialsStore
  let oauthStore
  let openTimeoutWarningPopupStub
  before(function () {
    credentialsStore = CredentialsStore.create()
    oauthStore = OAuthStore.create({
      credentials: credentialsStore,
      ui: UIStore.create()
    })
  })

  it('should exist', function () {
    expect(CredentialsStore).to.be.an('object')
  })

  it('should have an `expiresAt` property', function () {
    expect(credentialsStore.expiresAt).to.equal(DEFAULT_CREDENTIALS.expiresAt)
  })

  it('should have a `token` property', function () {
    expect(credentialsStore.token).to.equal(DEFAULT_CREDENTIALS.token)
  })

  describe('#set', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.set).to.be.a('function')
    })
    
    it('should set the expiresAt and token properties', function () {
      credentialsStore.set(CREDENTIALS)
      expect(credentialsStore.expiresAt).to.equal(CREDENTIALS.expiresAt)
      expect(credentialsStore.token).to.equal(CREDENTIALS.token)
    })

    it('should throw a ReferenceError if argument is missing expiresAt', function () {
      expect(function () { credentialsStore.set({ expiresAt: '12345' }) }).to.throw(ReferenceError)
    })

    it('should throw a ReferenceError if argument is missing token', function () {
      expect(function () { credentialsStore.set({ token: '12345' }) }).to.throw(ReferenceError)
    })

    it('should call #saveCredentials with the credentials argument', function () {
      const saveCredentialsSpy = sinon.spy(oauthStore.credentials, 'saveCredentials')
      credentialsStore.set(CREDENTIALS)

      expect(saveCredentialsSpy.calledOnce).to.be.true
      expect(saveCredentialsSpy.calledWith(CREDENTIALS)).to.be.true
      saveCredentialsSpy.resetHistory()
    })

    it('should call #setTimers with the expiresAt crendentials property', function () {
      const setTimersSpy = sinon.spy(oauthStore.credentials, 'setTimers')
      credentialsStore.set(CREDENTIALS)

      expect(setTimersSpy.calledOnce).to.be.true
      expect(setTimersSpy.calledWith(CREDENTIALS.expiresAt)).to.be.true
      setTimersSpy.resetHistory()
    })
  })

  describe('#reset', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.reset).to.be.a('function')
    })

    it('should have reset expiresAt and token back to default', function () {
      credentialsStore.set(CREDENTIALS)
      credentialsStore.reset()
      expect(credentialsStore.expiresAt).to.equal(DEFAULT_CREDENTIALS.expiresAt)
      expect(credentialsStore.token).to.equal(DEFAULT_CREDENTIALS.token)
    })

    it('should call #deleteCredentials', function () {
      const deleteCredentialsSpy = sinon.spy(oauthStore.credentials, 'deleteCredentials')
      credentialsStore.reset()
      expect(deleteCredentialsSpy.calledOnce).to.be.true
      deleteCredentialsSpy.resetHistory()
    })
  })

  describe('#logout', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })


    it('should be a function', function () {
      expect(credentialsStore.logout).to.be.a('function')
    })

    it('should call #reset', function () {
      const resetSpy = sinon.spy(oauthStore.credentials, 'reset')
      credentialsStore.logout()
      expect(resetSpy.calledOnce).to.be.true
      resetSpy.resetHistory()
    })

    it('should call uiStore\'s #openLogoutPopup', function () {
      const openLogoutPopupSpy = sinon.spy(oauthStore.ui, 'openLogoutPopup')
      credentialsStore.logout()
      expect(openLogoutPopupSpy.calledOnce).to.be.true
      openLogoutPopupSpy.resetHistory()
    })
  })

  describe('#onTimeout', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.onTimeout).to.be.a('function')
    })

    it('should call #logout', function () {
      const logoutSpy = sinon.spy(oauthStore.credentials, 'logout')
      credentialsStore.onTimeout()
      expect(logoutSpy.calledOnce).to.be.true
      logoutSpy.resetHistory()
    })

    it('should call uiStore\'s #openTimeoutPopup', function () {
      const openTimeoutPopupSpy = sinon.spy(oauthStore.ui, 'openTimeoutPopup')
      credentialsStore.onTimeout()
      expect(openTimeoutPopupSpy.calledOnce).to.be.true
      openTimeoutPopupSpy.resetHistory()
    })
  })

  describe('#setTimers', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.setTimers).to.be.a('function')
    })

    it('should set timeouts for auth timeout and timeout warning', function () {
      const timeoutSpy = sinon.spy(global, 'setTimeout')
      credentialsStore.setTimers(observable.box(123456789))
      expect(timeoutSpy.calledTwice).to.be.true
      timeoutSpy.resetHistory()
    })
  })

  describe('#saveCredentials', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.saveCredentials).to.be.a('function')
    })

    it('should store the credentials in localStorage', function () {
      credentialsStore.saveCredentials(CREDENTIALS)
      expect(localStorage.getItem('@zooniverse/auth OAuth')).to.exist
    })
  })

  describe('#deleteCredentials', function () {
    before(function () {
      credentialsStore = CredentialsStore.create()
      oauthStore = OAuthStore.create({
        credentials: credentialsStore,
        ui: UIStore.create()
      })
    })

    afterEach(function () {
      credentialsStore.reset() // Make sure timeouts and localStorage are cleared
    })

    it('should be a function', function () {
      expect(credentialsStore.deleteCredentials).to.be.a('function')
    })

    it('should store the credentials in localStorage', function () {
      credentialsStore.saveCredentials(CREDENTIALS)
      credentialsStore.deleteCredentials()
      expect(localStorage.getItem('@zooniverse/auth OAuth')).to.be.null
    })
  })
})
