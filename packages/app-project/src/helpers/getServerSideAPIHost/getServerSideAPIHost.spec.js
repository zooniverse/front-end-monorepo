import getServerSideAPIHost, { getServerSideERASHost } from './'

describe('Helpers > getServerSideAPIHost', function () {
  let originalAppEnv

  beforeEach(function () {
    originalAppEnv = process.env.APP_ENV
  })

  afterEach(function () {
    if (originalAppEnv === undefined) {
      delete process.env.APP_ENV
    } else {
      process.env.APP_ENV = originalAppEnv
    }
  })

  describe('getServerSideERASHost', function () {
    it('should use the internal production ERAS service when deployed to Kubernetes', function () {
      process.env.APP_ENV = 'production'

      expect(getServerSideERASHost('production')).to.deep.equal({
        headers: { 'X-Forwarded-Proto': 'https' },
        host: 'http://eras-production-app'
      })
    })

    it('should use the internal staging ERAS service when deployed to Kubernetes', function () {
      process.env.APP_ENV = 'staging'

      expect(getServerSideERASHost('staging')).to.deep.equal({
        headers: { 'X-Forwarded-Proto': 'https' },
        host: 'http://eras-staging-app'
      })
    })

    it('should use public ERAS hosts in local development', function () {
      delete process.env.APP_ENV

      expect(getServerSideERASHost('production')).to.deep.equal({
        headers: {},
        host: undefined
      })
    })
  })

  describe('default Panoptes host', function () {
    it('should retain the existing internal Panoptes host behavior', function () {
      process.env.APP_ENV = 'production'

      expect(getServerSideAPIHost('staging')).to.deep.equal({
        headers: { 'X-Forwarded-Proto': 'https' },
        host: 'http://panoptes-staging-app/api'
      })
    })
  })
})
