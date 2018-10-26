const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('./config')
const panoptes = require('./panoptes')

describe('panoptes.js', function () {
  describe('get', function () {
    let superagentMock
    let actualMatch
    let actualHeaders
    const endpoint = '/projects'
    const expectedResponse = { id: '2' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualHeaders = header
          return expectedResponse
        },
        get: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', async function () {
      const response = await panoptes.get(endpoint)
      expect(response).to.deep.equal({ body: expectedResponse })
    })

    it('should use the host from the function call if defined', async function () {
      const mockAPIHost = 'https://my-api.com'
      const response = await panoptes.get(endpoint, null, null, mockAPIHost)
      expect(actualMatch.input.includes(mockAPIHost)).to.be.true
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', async function () {
      await panoptes.get(endpoint)
      expect(actualMatch.input.includes(config.host)).to.be.true
    })

    it('should add Content-Type header to the request', async function () {
      await panoptes.get(endpoint)
      expect(actualHeaders['Content-Type']).to.exist
      expect(actualHeaders['Content-Type']).to.equal('application/json')
    })

    it('should add Accept header to the request', async function () {
      await panoptes.get(endpoint)
      expect(actualHeaders['Accept']).to.exist
      expect(actualHeaders['Accept']).to.equal('application/vnd.api+json; version=1')
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      await panoptes.get(endpoint, null, '12345')
      expect(actualHeaders['Authorization']).to.exist
      expect(actualHeaders['Authorization']).to.equal('12345')
    })

    it('should add the http_cache default query params to the request', async function () {
      await panoptes.get(endpoint)
      expect(actualMatch.input.includes('?http_cache=true')).to.be.true
    })

    it('should add the admin default query param if flag is found in local storage', async function () {
      localStorage.setItem('adminFlag', true)

      await panoptes.get(endpoint)
      expect(actualMatch.input.includes('?admin=true')).to.be.true
      localStorage.removeItem('adminFlag')
    })

    it('should add the query object to the URL if defined', async function () {
      await panoptes.get(endpoint, { page: '2', page_size: '30' })
      expect(actualMatch.input.includes('?page=2&page_size=30')).to.be.true
    })

    it('should error if query params are defined but are not an object', async function () {
      try {
        await panoptes.get(endpoint, '?foo=bar')
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Query must be an object')
      }
    })

    it('should error if request is called without a defined resource endpoint', async function () {
      try {
        await panoptes.get()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      }
    })
  })

  describe('post', function () {
    let superagentMock
    let actualMatch
    let actualParams
    let actualHeaders
    const endpoint = '/projects'
    const expectedResponse = { id: '3' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualParams = params
          actualHeaders = header
          return expectedResponse
        },
        post: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', async function () {
      const response = await panoptes.post(endpoint)
      expect(response).to.deep.equal({ body: expectedResponse })
    })

    it('should use the host from the function call if defined', async function () {
      const mockAPIHost = 'https://my-api.com'
      const response = panoptes.post(endpoint, null, null, mockAPIHost)
      expect(actualMatch.input.includes(mockAPIHost)).to.be.true
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', async function () {
      await panoptes.post(endpoint)
      expect(actualMatch.input.includes(config.host)).to.be.true
    })

    it('should add Content-Type header to the request', async function () {
      await panoptes.post(endpoint)
      expect(actualHeaders['Content-Type']).to.exist
      expect(actualHeaders['Content-Type']).to.equal('application/json')
    })

    it('should add Accept header to the request', async function () {
      await panoptes.post(endpoint)
      expect(actualHeaders['Accept']).to.exist
      expect(actualHeaders['Accept']).to.equal('application/vnd.api+json; version=1')
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      await panoptes.post(endpoint, null, '12345')
      expect(actualHeaders['Authorization']).to.exist
      expect(actualHeaders['Authorization']).to.equal('12345')
    })

    it('should add the http_cache default query params to the request', async function () {
      await panoptes.post(endpoint)
      expect(actualMatch.input.includes('?http_cache=true')).to.be.true
    })

    it('should add the admin default query param if flag is found in local storage', async function () {
      localStorage.setItem('adminFlag', true)

      await panoptes.post(endpoint)
      expect(actualMatch.input.includes('?admin=true')).to.be.true
      localStorage.removeItem('adminFlag')
    })

    it('should send any data params if defined', async function () {
      const params = { display_name: 'My project' }
      await panoptes.post(endpoint, params)
      expect(actualParams).to.deep.equal(params)
    })

    it('should error if request is called without a defined resource endpoint', async function () {
      try {
        await panoptes.post()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      }
    })
  })

  describe('put', function () {
    let superagentMock
    let actualMatch
    let actualParams
    let actualHeaders
    const endpoint = '/projects/2'
    const update = { display_name: 'My project' }
    const expectedResponse = { id: '3', display_name: 'My project' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: '/projects/(\\d+)',
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualParams = params
          actualHeaders = header
          return expectedResponse
        },
        put: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', async function () {
      const response = await panoptes.put(endpoint, update)
      expect(response).to.deep.equal({ body: expectedResponse })
    })

    it('should use the host from the function call if defined', async function () {
      const mockAPIHost = 'https://my-api.com'
      await panoptes.put(endpoint, update, null, mockAPIHost)
      expect(actualMatch.input.includes(mockAPIHost)).to.be.true
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', async function () {
      await panoptes.put(endpoint, update)
      expect(actualMatch.input.includes(config.host)).to.be.true
    })

    it('should add Content-Type header to the request', async function () {
      await panoptes.put(endpoint, update)
      expect(actualHeaders['Content-Type']).to.exist
      expect(actualHeaders['Content-Type']).to.equal('application/json')
    })

    it('should add Accept header to the request', async function () {
      await panoptes.put(endpoint, update)
      expect(actualHeaders['Accept']).to.exist
      expect(actualHeaders['Accept']).to.equal('application/vnd.api+json; version=1')
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      await panoptes.put(endpoint, update, '12345')
      expect(actualHeaders['Authorization']).to.exist
      expect(actualHeaders['Authorization']).to.equal('12345')
    })

    it('should add the http_cache default query params to the request', async function () {
      await panoptes.put(endpoint, update)
      expect(actualMatch.input.includes('?http_cache=true')).to.be.true
    })

    it('should add the admin default query param if flag is found in local storage', async function () {
      localStorage.setItem('adminFlag', true)

      await panoptes.put(endpoint, update)
      expect(actualMatch.input.includes('?admin=true')).to.be.true
      localStorage.removeItem('adminFlag')
    })

    it('should send any data params if defined', async function () {
      await panoptes.put(endpoint, update)
      expect(actualParams).to.deep.equal(update)
    })

    it('should error if request is called without a defined resource endpoint', async function () {
      try {
        await panoptes.put()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      }
    })
  })

  describe('delete', function () {
    let superagentMock
    let actualMatch
    let actualHeaders
    const endpoint = '/projects'
    const expectedResponse = { status: 204 }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualHeaders = header
          return expectedResponse
        },
        delete: (match, data) => { return data }
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', async function () {
      const response = await panoptes.del(endpoint)
      expect(response).to.equal(expectedResponse)
    })

    it('should use the host from the function call if defined', async function () {
      const mockAPIHost = 'https://my-api.com'
      await panoptes.del(endpoint, null, mockAPIHost)
      expect(actualMatch.input.includes(mockAPIHost)).to.be.true
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', async function () {
      await panoptes.del(endpoint)
      expect(actualMatch.input.includes(config.host)).to.be.true
    })

    it('should add Content-Type header to the request', async function () {
      await panoptes.del(endpoint)
      expect(actualHeaders['Content-Type']).to.exist
      expect(actualHeaders['Content-Type']).to.equal('application/json')
    })

    it('should add Accept header to the request', async function () {
      await panoptes.del(endpoint)
      expect(actualHeaders['Accept']).to.exist
      expect(actualHeaders['Accept']).to.equal('application/vnd.api+json; version=1')
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      await panoptes.del(endpoint, '12345')
      expect(actualHeaders['Authorization']).to.exist
      expect(actualHeaders['Authorization']).to.equal('12345')
    })

    it('should add the http_cache default query params to the request', async function () {
      await panoptes.del(endpoint)
      expect(actualMatch.input.includes('?http_cache=true')).to.be.true
    })

    it('should add the admin default query param if flag is found in local storage', async function () {
      localStorage.setItem('adminFlag', true)

      await panoptes.del(endpoint)
      expect(actualMatch.input.includes('?admin=true')).to.be.true
      localStorage.removeItem('adminFlag')
    })

    it('should error if request is called without a defined resource endpoint', async function () {
      try {
        await panoptes.del()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      }
    })
  })
})
