const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('./config')
const panoptes = require('./panoptes')

describe.only('panoptes.js', function () {
  describe('get', function () {
    let superagentMock
    let actualMatch
    let actualHeader
    const endpoint = '/projects'
    const expectedResponse = { id: '2' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualHeader = header
          return expectedResponse
        },
        get: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return panoptes.get(endpoint).then((response) => {
        expect(response).to.deep.equal({ body: expectedResponse })
      })
    })

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com'
      return panoptes.get(endpoint, null, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true
      })
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.get(endpoint).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true
      })
    })

    it('should add Content-Type header to the request', function () {
      return panoptes.get(endpoint).then((response) => {
        expect(actualHeader['Content-Type']).to.exist
        expect(actualHeader['Content-Type']).to.equal('application/json')
      })
    })

    it('should add Accept header to the request', function () {
      return panoptes.get(endpoint).then((response) => {
        expect(actualHeader['Accept']).to.exist
        expect(actualHeader['Accept']).to.equal('application/vnd.api+json; version=1')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return panoptes.get(endpoint, null, '12345').then((response) => {
        expect(actualHeader['Authorization']).to.exist
        expect(actualHeader['Authorization']).to.equal('12345')
      })
    })

    it('should add the http_cache default query params to the request', function () {
      return panoptes.get(endpoint).then(() => {
        expect(actualMatch.input.includes('?http_cache=true')).to.be.true
      })
    })

    it('should add the admin default query param if flag is found in local storage', function () {
      localStorage.setItem('adminFlag', true)

      return panoptes.get(endpoint).then(() => {
        expect(actualMatch.input.includes('?admin=true')).to.be.true
        localStorage.removeItem('adminFlag')
      })
    })

    it('should add the query object to the URL if defined', function () {
      return panoptes.get(endpoint, { page: '2', page_size: '30' }).then((response) => {
        expect(actualMatch.input.includes('?page=2&page_size=30')).to.be.true
      })
    })

    it('should error if query params are defined but are not an object', function () {
      return panoptes.get(endpoint, '?foo=bar').catch((error) => {
        expect(error.message).to.equal('Query must be an object')
      })
    })

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.get().catch((error) => {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      })
    })
  })

  describe('post', function () {
    let superagentMock
    let actualMatch
    let actualParams
    let actualHeader
    const endpoint = '/projects'
    const expectedResponse = { id: '3' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualParams = params
          actualHeader = header
          return expectedResponse
        },
        post: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(response).to.deep.equal({ body: expectedResponse })
      })
    })

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com'
      return panoptes.post(endpoint, null, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true
      })
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true
      })
    })

    it('should add Content-Type header to the request', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualHeader['Content-Type']).to.exist
        expect(actualHeader['Content-Type']).to.equal('application/json')
      })
    })

    it('should add Accept header to the request', function () {
      return panoptes.post(endpoint).then((response) => {
        expect(actualHeader['Accept']).to.exist
        expect(actualHeader['Accept']).to.equal('application/vnd.api+json; version=1')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return panoptes.post(endpoint, null, '12345').then((response) => {
        expect(actualHeader['Authorization']).to.exist
        expect(actualHeader['Authorization']).to.equal('12345')
      })
    })

    it('should add the http_cache default query params to the request', function () {
      return panoptes.post(endpoint).then(() => {
        expect(actualMatch.input.includes('?http_cache=true')).to.be.true
      })
    })

    it('should add the admin default query param if flag is found in local storage', function () {
      localStorage.setItem('adminFlag', true)

      return panoptes.post(endpoint).then(() => {
        expect(actualMatch.input.includes('?admin=true')).to.be.true
        localStorage.removeItem('adminFlag')
      })
    })

    it('should send any data params if defined', function () {
      const params = { display_name: 'My project' }
      return panoptes.post(endpoint, params).then((response) => {
        expect(actualParams).to.deep.equal(params)
      })
    })

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.post().catch((error) => {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      })
    })
  })

  describe('put', function () {
    let superagentMock
    let actualMatch
    let actualParams
    let actualHeader
    const endpoint = '/projects/2'
    const update = { display_name: 'My project' }
    const expectedResponse = { id: '3', display_name: 'My project' }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: '/projects/(\\d+)',
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualParams = params
          actualHeader = header
          return expectedResponse
        },
        put: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(response).to.deep.equal({ body: expectedResponse })
      })
    })

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com'
      return panoptes.put(endpoint, update, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true
      })
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true
      })
    })

    it('should add Content-Type header to the request', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualHeader['Content-Type']).to.exist
        expect(actualHeader['Content-Type']).to.equal('application/json')
      })
    })

    it('should add Accept header to the request', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualHeader['Accept']).to.exist
        expect(actualHeader['Accept']).to.equal('application/vnd.api+json; version=1')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return panoptes.put(endpoint, update, '12345').then((response) => {
        expect(actualHeader['Authorization']).to.exist
        expect(actualHeader['Authorization']).to.equal('12345')
      })
    })

    it('should add the http_cache default query params to the request', function () {
      return panoptes.put(endpoint, update).then(() => {
        expect(actualMatch.input.includes('?http_cache=true')).to.be.true
      })
    })

    it('should add the admin default query param if flag is found in local storage', function () {
      localStorage.setItem('adminFlag', true)

      return panoptes.put(endpoint, update).then(() => {
        expect(actualMatch.input.includes('?admin=true')).to.be.true
        localStorage.removeItem('adminFlag')
      })
    })

    it('should send any data params if defined', function () {
      return panoptes.put(endpoint, update).then((response) => {
        expect(actualParams).to.deep.equal(update)
      })
    })

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.put().catch((error) => {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      })
    })
  })

  describe('delete', function () {
    let superagentMock
    let actualMatch
    let actualHeader
    const endpoint = '/projects'
    const expectedResponse = { status: 204 }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: endpoint,
        fixtures: (match, params, header, context) => {
          actualMatch = match
          actualHeader = header
          return expectedResponse
        },
        delete: (match, data) => { return data }
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return panoptes.del(endpoint).then((response) => {
        expect(response).to.equal(expectedResponse)
      })
    })

    it('should use the host from the function call if defined', function () {
      const mockAPIHost = 'https://my-api.com'
      return panoptes.del(endpoint, null, mockAPIHost).then((response) => {
        expect(actualMatch.input.includes(mockAPIHost)).to.be.true
      })
    })

    it('should use the host defined in the config if a host parameter isn\'t defined', function () {
      return panoptes.del(endpoint).then((response) => {
        expect(actualMatch.input.includes(config.host)).to.be.true
      })
    })

    it('should add Content-Type header to the request', function () {
      return panoptes.del(endpoint).then((response) => {
        expect(actualHeader['Content-Type']).to.exist
        expect(actualHeader['Content-Type']).to.equal('application/json')
      })
    })

    it('should add Accept header to the request', function () {
      return panoptes.del(endpoint).then((response) => {
        expect(actualHeader['Accept']).to.exist
        expect(actualHeader['Accept']).to.equal('application/vnd.api+json; version=1')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return panoptes.del(endpoint, '12345').then((response) => {
        expect(actualHeader['Authorization']).to.exist
        expect(actualHeader['Authorization']).to.equal('12345')
      })
    })

    it('should add the http_cache default query params to the request', function () {
      return panoptes.del(endpoint).then(() => {
        expect(actualMatch.input.includes('?http_cache=true')).to.be.true
      })
    })

    it('should add the admin default query param if flag is found in local storage', function () {
      localStorage.setItem('adminFlag', true)

      return panoptes.del(endpoint).then(() => {
        expect(actualMatch.input.includes('?admin=true')).to.be.true
        localStorage.removeItem('adminFlag')
      })
    })

    it('should error if request is called without a defined resource endpoint', function () {
      return panoptes.del().catch((error) => {
        expect(error.message).to.equal('Request needs a defined resource endpoint')
      })
    })
  })
})
