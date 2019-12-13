const Client = require('../../src/client')

describe('Unit Tests > Client', async function () {
  describe('_exchangeJWTForToken method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._exchangeJWTForToken).to.be.a('function')
    })
  })

  describe('getAccessToken method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.getAccessToken).to.be.a('function')
    })
  })

  describe('_getCSRFToken method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._getCSRFToken).to.be.a('function')
    })
  })

  describe('_getJWTFromBrowser method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._getJWTFromBrowser).to.be.a('function')
    })
  })

  describe('_getJWTFromResponse method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._getJWTFromResponse).to.be.a('function')
    })
  })

  describe('_handleNewTokenData method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._handleNewTokenData).to.be.a('function')
    })
  })

  describe('_isAccessTokenValid method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._isAccessTokenValid).to.be.a('function')
    })
  })

  describe('isSignedIn method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.isSignedIn).to.be.a('function')
    })

    it('should return true if there\'s an access token in state', function () {
      const client = new Client({}, {})
      client._state.accessToken = 'test_token'
      expect(client.isSignedIn()).to.be.true()
    })

    it('should return false if there\'s no access token in state', function () {
      const client = new Client({}, {})
      expect(client.isSignedIn()).to.be.false()
    })
  })

  describe('_refreshTokenData method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._refreshTokenData).to.be.a('function')
    })
  })

  describe('register method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.register).to.be.a('function')
    })
  })

  describe('_resetState method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client._resetState).to.be.a('function')
    })
  })

  describe('resumeSession method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.resumeSession).to.be.a('function')
    })
  })

  describe('signIn method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.signIn).to.be.a('function')
    })
  })

  describe('signOut method', function () {
    it('should exist', function () {
      const client = new Client({}, {})
      expect(client.signOut).to.be.a('function')
    })
  })
})
