import UIStore from './UIStore'

let uiStore


describe('Model > UIStore', function () {
  beforeEach(function () {
    uiStore = UIStore.create()
  })

  it('should exist', function () {
    expect(uiStore).to.be.an('object')
  })

  it('should have a `showLoginPopup` property', function () {
    expect(uiStore.showLoginPopup).to.be.false
  })

  it('should have a `showLogoutPopup` property', function () {
    expect(uiStore.showLogoutPopup).to.be.false
  })

  it('should have a `showTimeoutPopup` property', function () {
    expect(uiStore.showTimeoutPopup).to.be.false
  })

  it('should have a `showTimeoutWarningPopup` property', function () {
    expect(uiStore.showTimeoutWarningPopup).to.be.false
  })

  it('should have a `openLoginPopup` method', function () {
    expect(uiStore.openLoginPopup).to.be.a('function')
    uiStore.openLoginPopup()
    expect(uiStore.showLoginPopup).to.be.true
  })

  it('should have a `closeLoginPopup` method', function () {
    expect(uiStore.closeLoginPopup).to.be.a('function')
    uiStore.closeLoginPopup()
    expect(uiStore.showLoginPopup).to.be.false
  })

  it('should have a `openLogoutPopup` method', function () {
    expect(uiStore.openLogoutPopup).to.be.a('function')
    uiStore.openLogoutPopup()
    expect(uiStore.showLogoutPopup).to.be.true
  })

  it('should have a `closeLogoutPopup` method', function () {
    expect(uiStore.closeLogoutPopup).to.be.a('function')
    uiStore.closeLogoutPopup()
    expect(uiStore.showLogoutPopup).to.be.false
  })

  it('should have a `openTimeoutPopup` method', function () {
    expect(uiStore.openTimeoutPopup).to.be.a('function')
    uiStore.openTimeoutPopup()
    expect(uiStore.showTimeoutPopup).to.be.true
  })

  it('should have a `closeTimeoutPopup` method', function () {
    expect(uiStore.closeTimeoutPopup).to.be.a('function')
    uiStore.closeTimeoutPopup()
    expect(uiStore.showTimeoutPopup).to.be.false
  })

  it('should have a `openTimeoutWarningPopup` method', function () {
    expect(uiStore.openTimeoutWarningPopup).to.be.a('function')
    uiStore.openTimeoutWarningPopup()
    expect(uiStore.showTimeoutWarningPopup).to.be.true
  })

  it('should have a `closeTimeoutWarningPopup` method', function () {
    expect(uiStore.closeTimeoutWarningPopup).to.be.a('function')
    uiStore.closeTimeoutWarningPopup()
    expect(uiStore.showTimeoutWarningPopup).to.be.false
  })

  it('should have a `reset` method', function () {
    expect(uiStore.reset).to.be.a('function')
    uiStore = UIStore.create({
      showLoginPopup: true,
      showLogoutPopup: true,
      showTimeoutPopup: true,
      showTimeoutWarningPopup: true
    })
    uiStore.reset()
    expect(uiStore.showLoginPopup).to.be.false
    expect(uiStore.showLogoutPopup).to.be.false
    expect(uiStore.showTimeoutPopup).to.be.false
    expect(uiStore.showTimeoutWarningPopup).to.be.false
  })

})
