const nock = require('nock')

const createClient = require('../../../../src')
const fixtures = require('./fixtures')

describe('Functional Tests > Node (Isolation)', function () {
  let client
  let scope

  before(function () {
    client = createClient({
      clientAppID: fixtures.clientAppID,
      hostUrl: fixtures.baseUrl
    })
  })

  describe('user registration', function () {
    let scope

    before(function () {
      scope = nock(fixtures.baseUrl)
        .persist()
        .head('/users/sign_in')
        .query(queryObject => !!queryObject.now)
        .reply(200, '', {
          'x-csrf-token': fixtures.mockCSRFToken
        })
        .post('/users')
        .reply(200)
        .post('/users/sign_in')
        .reply(200, '', {
          'set-cookie': [
            `_Panoptes_session=${fixtures.mockJWT}`
          ]
        })
        .post('/oauth/token')
        .reply(200, {
          'access_token': fixtures.mockAccessToken,
          'created_at': fixtures.mockCreatedAt,
          'expires_in': fixtures.mockAccessTokenExpiresIn,
          'refresh_token': fixtures.mockRefreshToken,
          scope: fixtures.mockScope
        })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should let you register as a new user', async function () {
      const newToken = await client.register(fixtures.newUser)
      expect(newToken).to.equal(fixtures.mockAccessToken)
    })
  })

  describe('sign out', function () {
    let scope

    before(function () {
      scope = nock(fixtures.baseUrl)
        .persist()
        .head('/users/sign_in')
        .query(queryObject => !!queryObject.now)
        .reply(200, '', {
          'x-csrf-token': fixtures.mockCSRFToken
        })
        .delete('/users/sign_out')
        .reply(200, '')
    })

    after(function () {
      nock.cleanAll()
    })

    it('should let you sign out', async function () {
      await client.signOut()
      const token = await client.getAccessToken()
      expect(token).to.equal('')
     })
  })

  describe('sign in', function () {
    let scope

    before(function () {
      scope = nock(fixtures.baseUrl)
        .persist()
        .head('/users/sign_in')
        .query(queryObject => !!queryObject.now)
        .reply(200, '', {
          'x-csrf-token': fixtures.mockCSRFToken
        })
        .post('/users/sign_in')
        .reply(200, '', {
          'set-cookie': [
            `_Panoptes_session=${fixtures.mockJWT}`
          ]
        })
        .post('/oauth/token')
        .reply(200, {
          'access_token': fixtures.mockAccessToken,
          'created_at': fixtures.mockCreatedAt,
          'expires_in': fixtures.mockAccessTokenExpiresIn,
          'refresh_token': fixtures.mockRefreshToken,
          scope: fixtures.mockScope
        })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should let you sign in as an existing user', async function () {
      const newToken = await client.signIn(fixtures.existingUser)
      expect(newToken).to.equal(fixtures.mockAccessToken)
    })
  })
})
