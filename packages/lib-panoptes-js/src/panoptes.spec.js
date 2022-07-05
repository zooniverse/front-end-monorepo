const { expect } = require('chai')
const nock = require('nock')

const { baseConfig, config } = require('./config')
const panoptes = require('./panoptes')

describe('panoptes.js', function () {
  describe('get', function () {
    const endpoint = '/projects/2'
    const expectedResponse = { id: '2' }
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .get(endpoint)
        .query(true)
        .reply(200, expectedResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    testExpectedResponse('get', endpoint, expectedResponse)
    testHostArg('get', endpoint, expectedResponse)
    testConfigHost('get', endpoint)
    testContentTypeHeader('get', endpoint)
    testAcceptHeader('get', endpoint)
    testAuthHeader('get', endpoint)
    testHttpCache('get', endpoint)
    testEnvParam('get', endpoint, expectedResponse)
    testAdminParam('get', endpoint)
    testNoEndpoint('get')

    it('should add the query object to the URL if defined', async function () {
      const response = await panoptes.get(endpoint, { page: '2', page_size: '30' })
      expect(response.req.path.includes('?page=2&page_size=30')).to.be.true()
    })

    it('should error if query params are defined but are not an object', async function () {
      try {
        await panoptes.get(endpoint, '?foo=bar')
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Query must be an object')
      }
    })
  })

  describe('post', function () {
    const endpoint = '/projects'
    const expectedResponse = { id: '3' }
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .post(endpoint)
        .query(true)
        .reply(200, expectedResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    testExpectedResponse('post', endpoint, expectedResponse)
    testHostArg('post', endpoint, expectedResponse)
    testConfigHost('post', endpoint)
    testContentTypeHeader('post', endpoint)
    testAcceptHeader('post', endpoint)
    testAuthHeader('post', endpoint)
    testHttpCache('post', endpoint)
    testEnvParam('post', endpoint, expectedResponse)
    testAdminParam('post', endpoint)
    testNoEndpoint('post')

    it('should send any data params if defined', async function () {
      const data = { display_name: 'My project' }
      const response = await panoptes.post(endpoint, data)
      expect(response.request._data).to.deep.equal(data)
    })
  })

  describe('put', function () {
    const endpoint = '/projects/3'
    const update = { display_name: 'My project' }
    const expectedResponse = { id: '3', display_name: 'My project' }
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .put(endpoint)
        .query(true)
        .reply(200, expectedResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    testExpectedResponse('put', endpoint, expectedResponse, update)
    testHostArg('put', endpoint, expectedResponse, update)
    testConfigHost('put', endpoint, update)
    testContentTypeHeader('put', endpoint, update)
    testAcceptHeader('put', endpoint, update)
    testAuthHeader('put', endpoint, update)
    testHttpCache('put', endpoint, update)
    testEnvParam('put', endpoint, expectedResponse, update)
    testAdminParam('put', endpoint, update)
    testNoEndpoint('put')

    it('should add If-Match header to the request', async function () {
      const etag = 'W/"8d26cb6718e250b"'
      const response = await panoptes.put(endpoint, update, { etag })
      expect(response.req.headers['if-match']).to.equal(etag)
    })

    it('should send any data params if defined', async function () {
      const response = await panoptes.put(endpoint, update)
      expect(response.body).to.deep.equal(expectedResponse)
    })
  })

  describe('delete', function () {
    const endpoint = '/projects/2'
    const expectedResponse = { status: 204 }
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .delete(endpoint)
        .query(true)
        .reply(204, { status: 204 })
    })

    after(function () {
      nock.cleanAll()
    })

    testExpectedResponse('del', endpoint, expectedResponse)
    testHostArg('del', endpoint, expectedResponse)
    testConfigHost('del', endpoint)
    testContentTypeHeader('del', endpoint)
    testAcceptHeader('del', endpoint)
    testAuthHeader('del', endpoint)
    testHttpCache('del', endpoint)
    testEnvParam('del', endpoint, expectedResponse)
    testAdminParam('del', endpoint)
    testNoEndpoint('del')

    it('should use the env query param to set the host only', async function () {
      const queryParams = { env: 'production' }
      const { host } = baseConfig[queryParams.env]

      nock(host).delete(uri => uri.includes(endpoint))
        .query(true)
        .reply(200, expectedResponse)

      const response = await panoptes.del(endpoint, queryParams)
      expect(response.request.url.includes(host)).to.be.true()
      expect(response.req.path.includes('env=production')).to.be.false()
    })
  })

  function testExpectedResponse (method, endpoint, expectedResponse, update = null) {
    it('should return the expected response', async function () {
      const response = await panoptes[method](endpoint, update)
      expect(response.body).to.deep.equal(expectedResponse)
    })
  }

  function testHostArg (method, endpoint, expectedResponse, update = null, query = null) {
    it('should use the host from the function call if defined', async function () {
      const mockAPIHost = 'https://my-api.com'

      const isDel = method === 'del'
      const isPost = method === 'post'
      const isPut = method === 'put'
      // Nock calls it 'delete', panoptes-js calls it 'del'
      const nockMethod = isDel ? 'delete' : method
      const methodArgs = (isPost || isPut)
        ? [endpoint, update, {}, query, mockAPIHost]
        : [endpoint, update, {}, mockAPIHost]

      nock(mockAPIHost)[nockMethod](uri => uri.includes(endpoint))
        .query(true)
        .reply(200, expectedResponse)

      const response = await panoptes[method].apply(this, methodArgs)
      expect(response.request.url.includes(mockAPIHost)).to.be.true()
    })
  }

  function testConfigHost (method, endpoint, update = null) {
    it('should use the host defined in the config if a host parameter isn\'t defined', async function () {
      const response = await panoptes[method](endpoint, update)
      expect(response.request.url.includes(config.host)).to.be.true()
    })
  }

  function testContentTypeHeader (method, endpoint, update = null) {
    it('should add the `Content-Type` header to the request', async function () {
      const response = await panoptes[method](endpoint, update)
      expect(response.req.headers['content-type']).to.equal('application/json')
    })
  }

  function testAcceptHeader (method, endpoint, update = null) {
    it('should add the `Accept` header to the request', async function () {
      const response = await panoptes[method](endpoint, update)
      expect(response.req.headers['accept']).to.equal('application/vnd.api+json; version=1')
    })
  }

  function testAuthHeader (method, endpoint, update = null) {
    it('should add the `Authorization` header to the request if param is defined', async function () {
      const headers = { authorization: 'Bearer 12345' }
      const methodArgs = [endpoint, update, headers]

      const response = await panoptes[method].apply(this, methodArgs)
      expect(response.req.headers['authorization']).to.equal('Bearer 12345')
    })
  }

  function testHttpCache (method, endpoint, update = null) {
    it('should add the http_cache default query params to the request', async function () {
      const response = await panoptes[method](endpoint, update)
      expect(response.req.path.includes('?http_cache=true')).to.be.true()
    })
  }

  function testEnvParam (method, endpoint, expectedResponse) {
    it('should use the env query param to set the host only', async function () {
      const envParams = { env: 'production' }
      const { host } = baseConfig[envParams.env]
      const isDel = method === 'del'
      const isPost = method === 'post'
      const isPut = method === 'put'
      // Nock calls it 'delete', panoptes-js calls it 'del'
      const nockMethod = isDel ? 'delete' : method
      const methodArgs = (isPost || isPut)
        ? [endpoint, {}, '', envParams]
        : [endpoint, envParams]

      nock(host)[nockMethod](uri => uri.includes(endpoint))
        .query(true)
        .reply(200, expectedResponse)

      const response = await panoptes[method].apply(this, methodArgs)
      expect(response.request.url.includes(host)).to.be.true()
      expect(response.req.path.includes('env=production')).to.be.false()
    })
  }

  function testAdminParam (method, endpoint, update = null) {
    it('should add the admin default query param if flag is found in local storage', async function () {
      localStorage.setItem('adminFlag', true)
      const response = await panoptes[method](endpoint, update)
      expect(response.req.path.includes('?admin=true')).to.be.true()
      localStorage.removeItem('adminFlag')
    })
  }

  function testNoEndpoint (method) {
    it('should error if request is called without a defined resource endpoint', async function () {
      try {
        await panoptes[method]()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      }
    })
  }
})
