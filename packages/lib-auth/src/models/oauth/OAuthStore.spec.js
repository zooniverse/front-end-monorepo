import OAuthStore from './OAuthStore'

const CREDENTIALS = {
  expiresAt: 123456789,
  token: 'foobar'
}

const DEFAULT_CREDENTIALS = {
  expiresAt: 0,
  token: null
}

let oauthStore

describe.only('Model > OAuthStore', function () {
  beforeEach(function () {
    oauthStore = OAuthStore.create()
  })

  it('should exist', function () {
    expect(OAuthStore).to.not.equal(undefined)
  })

  it('should have an `credentials` property', function () {
    expect(oauthStore.credentials).to.not.equal(undefined)
  })

  it('should have a `ui` property', function () {
    expect(oauthStore.ui).to.not.equal(undefined)
  })

  it('should have a `tokenObject` property', function () {
    oauthStore.credentials.set(CREDENTIALS)
    expect(oauthStore.tokenObject.expiresAt).to.equal(CREDENTIALS.expiresAt)
    expect(oauthStore.tokenObject.token).to.equal(CREDENTIALS.token)
    oauthStore.credentials.reset()
    expect(oauthStore.tokenObject).to.equal(null)
  })
})
