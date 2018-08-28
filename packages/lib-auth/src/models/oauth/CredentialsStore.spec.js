import CredentialsStore from './CredentialsStore'

let credentialsStore

const CREDENTIALS = {
  expiresAt: 123456789,
  token: 'foobar'
}

const DEFAULT_CREDENTIALS = {
  expiresAt: 0,
  token: null
}

describe('Model > CredentialsStore', function () {
  beforeEach(function () {
    credentialsStore = CredentialsStore.create()
  })

  it('should exist', function () {
    expect(CredentialsStore).to.not.equal(undefined)
  })

  it('should have an `expiresAt` property', function () {
    expect(credentialsStore.expiresAt).to.equal(DEFAULT_CREDENTIALS.expiresAt)
  })

  it('should have a `token` property', function () {
    expect(credentialsStore.token).to.equal(DEFAULT_CREDENTIALS.token)
  })

  it('should have a `set` method', function () {
    credentialsStore.set(CREDENTIALS)
    expect(credentialsStore.expiresAt).to.equal(CREDENTIALS.expiresAt)
    expect(credentialsStore.token).to.equal(CREDENTIALS.token)
  })

  it('should have a `reset` method', function () {
    credentialsStore.set(CREDENTIALS)
    credentialsStore.reset(CREDENTIALS)
    expect(credentialsStore.expiresAt).to.equal(DEFAULT_CREDENTIALS.expiresAt)
    expect(credentialsStore.token).to.equal(DEFAULT_CREDENTIALS.token)
  })
})
