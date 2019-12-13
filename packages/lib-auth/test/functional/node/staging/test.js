const createClient = require('../../../../src')

const fixtures = require('./fixtures')

describe('Functional Tests > Node (Staging)', function () {
  let client

  before(function () {
    client = createClient({
      clientAppID: fixtures.clientAppID,
      hostUrl: fixtures.baseUrl
    })
  })

  describe('user registration', function () {
    this.timeout(5000)

    it('should let you register as a new user', async function () {
      await client.register(fixtures.newUser)
    })
  })

  describe('sign out', function () {
    it('should let you sign out', async function () {
      await client.signOut()
    })
  })

  describe('sign in', function () {
    it('should let you sign in as an existing user', async function () {
      await client.signIn(fixtures.newUser)
    })
  })

})
