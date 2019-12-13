const Client = require('../../src/client')
const createClient = require('../../src/create-client')

describe('Unit Tests > createClient', async function () {
  it('should exist', function () {
    expect(createClient).to.be.a('function')
  })

  it('should return a client instance when passed a valid config', function () {
    const validConfig = {
      hostUrl: 'http://www.example.com/',
      clientAppID: 'foobar'
    }
    const instance = createClient(validConfig)
    expect(instance).to.be.an.instanceOf(Client)
  })

  it('should throw an error when passed an invalid config', function () {
    // Config validations are tested in `test/unit/helpers/validate-config.spec.js`
    const invalidConfig = {
      clientAppID: 'foobar'
    }
    expect(createClient.bind(createClient, invalidConfig)).to.throw()
  })
})
