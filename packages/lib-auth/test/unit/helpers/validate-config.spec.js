const validateConfig = require('../../../src/helpers/validate-config')

describe('Unit Tests > helpers > validateConfig', function () {
  it('should not throw if params are valid', function () {
    try {
      const goodTestParams = {
        hostUrl: 'http://www.fake-zooniverse.org/',
        clientAppID: 'foobar'
      }
      validateConfig(goodTestParams)
    } catch (error) {
      expect.fail()
    }
  })

  it('should throw an error if `hostUrl` is missing', function () {
    const badTestParams = {
      hostUrl: '',
      clientAppID: 'foobar'
    }
    expect(validateConfig.bind(validateConfig, badTestParams)).to.throw()
  })

  it('should throw an error if `hostUrl` is not a URL', function () {
    const badTestParams = {
      hostUrl: 'foobar',
      clientAppID: 'foobar'
    }
    expect(validateConfig.bind(validateConfig, badTestParams)).to.throw()
  })

  it('should throw an error if `clientAppID` is missing', function () {
    const badTestParams = {
      hostUrl: 'http://www.fake-zooniverse.org/',
      clientAppID: ''
    }
    expect(validateConfig.bind(validateConfig, badTestParams)).to.throw()
  })

  it('should throw an error if `clientAppID` not an alphanumeric string', function () {
    const badTestParams = {
      hostUrl: 'http://www.fake-zooniverse.org/',
      clientAppID: 'foobar!!1!1'
    }
    expect(validateConfig.bind(validateConfig, badTestParams)).to.throw()
  })

  it('should provide a default `cookieName`', function () {
    const goodTestParams = {
      hostUrl: 'http://www.fake-zooniverse.org/',
      clientAppID: 'foobar'
    }
    const validatedParams = validateConfig(goodTestParams)
    expect(validatedParams.cookieName).to.equal('_Panoptes_session')
  })
})
