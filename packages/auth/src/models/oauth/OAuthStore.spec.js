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

describe('Model > OAuthStore', function () {
  beforeEach(function () {
    oauthStore = OAuthStore.create()
  })

  it('should exist', function () {
    expect(OAuthStore).to.be.an('object')
  })

  it('should have an `credentials` property', function () {
    expect(oauthStore.credentials).to.be.an('object')
  })

  it('should have a `ui` property', function () {
    expect(oauthStore.ui).to.be.an('object')
  })

  describe('`tokenObject` getter property', function () {
    it('should return the credentials when set', function () {
      oauthStore.credentials.set(CREDENTIALS)
      expect(oauthStore.tokenObject.expiresAt).to.equal(CREDENTIALS.expiresAt)
      expect(oauthStore.tokenObject.token).to.equal(CREDENTIALS.token)
    })

    it('should return null if there are no credentials available', function () {
      oauthStore.credentials.reset()
      expect(oauthStore.tokenObject).to.equal(null)
    })
  })
})
