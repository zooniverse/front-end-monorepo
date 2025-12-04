import { config, env, locationMatch } from './config.js'

describe('config.js', function () {
  describe('environment from shell', function () {
    it('should use the value of process.env.NODE_ENV', function () {
      expect(env).to.equal('test')
    })

    it('should return the API host values for the test environment from the config export', function () {
      expect(config.host).to.equal('https://panoptes-staging.zooniverse.org/api')
      expect(config.oauth).to.equal('https://panoptes-staging.zooniverse.org')
    })
  })

  describe('environment from browser locationMatch function', function () {
    after(function () {
      jsdom.reconfigure({ url: 'about:blank' })
    })

    it('should return the value of the env query param', function () {
      jsdom.reconfigure({ url: 'https://www.zooniverse.org/?env=staging' })
      const env = locationMatch(/\W?env=(\w+)/)
      expect(env).to.equal('staging')
    })

    it('should return undefined if the url does not have an env query param', function () {
      jsdom.reconfigure({ url: 'https://www.zooniverse.org/' })
      const env = locationMatch(/\W?env=(\w+)/)
      // eslint-disable-next-line no-unused-expressions
      expect(env).to.be.undefined
    })
  })
})
