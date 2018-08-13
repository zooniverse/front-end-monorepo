const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')

const projects = require('./index')
const { endpoint } = require('./helpers')
const { config } = require('../../config')
const { responses } = require('./mocks')

describe('Projects resource REST requests', function () {
  describe('create', function () {
    let superagentMock
    let actualParams
    let actualHeaders
    const expectedResponse = responses.post.createdProject
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params, headers, context) => {
          actualParams = params
          actualHeaders = headers
          return expectedResponse
        },
        post: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return projects.create().then(response => {
        expect(response).to.eql({ body: expectedResponse }) // deep equality
      })
    })

    it('should have sent the expected data params with an added { private: true }', function () {
      const projectDisplayName = { display_name: 'My project' }
      return projects.create({ data: projectDisplayName }).then(response => {
        expect(actualParams).to.eql(Object.assign({}, { private: true }, projectDisplayName))
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return projects.create({ authorization: '12345' }).then((response) => {
        expect(actualHeaders['Authorization']).to.exist
        expect(actualHeaders['Authorization']).to.equal('12345')
      })
    })
  })

  describe('get', function () {
    describe('many projects', function () {
      let superagentMock
      let actualHeaders
      const expectedGetAllResponse = responses.get.projects

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params, headers, context) => {
            actualHeaders = headers
            return expectedGetAllResponse
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response without a defined id argument', function () {
        return projects.get().then(response => {
          expect(response).to.eql({ body: expectedGetAllResponse })
        })
      })

      it('should add the Authorization header to the request if param is defined', function () {
        return projects.get({ authorization: '12345' }).then((response) => {
          expect(actualHeaders['Authorization']).to.exist
          expect(actualHeaders['Authorization']).to.equal('12345')
        })
      })
    })

    describe('a single project', function () {
      let superagentMock
      let actualMatch
      let actualHeaders
      const expectedGetSingleResponse = responses.get.project

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}/(\\d+)`,
          fixtures: (match, params, headers, context) => {
            actualMatch = match
            actualHeaders = headers
            return expectedGetSingleResponse
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should add the Authorization header to the request if param is defined', function () {
        return projects.get({ authorization: '12345', id: '2' }).then((response) => {
          expect(actualHeaders['Authorization']).to.exist
          expect(actualHeaders['Authorization']).to.equal('12345')
        })
      })

      it('should return the expected response with a defined id argument', function () {
        return projects.get({ id: '2' }).then(response => {
          expect(response).to.eql({ body: expectedGetSingleResponse })
        })
      })

      it('should include query params with the request if defined', function () {
        const queryParams = { page: '2' }

        return projects.get({ id: '2', query: queryParams }).then(response => {
          expect(actualMatch.input.includes('?page=2')).to.be.true
        })
      })

      it('should error if id arugment is not a string', function () {
        return projects.get({ id: 2 }).catch(error => {
          expect(error.message).to.equal('Projects: Get request id must be a string.')
        })
      })
    })
  })

  describe('update', function () {
    let superagentMock
    let actualHeaders
    const expectedPutResponse = responses.updatedProject
    const update = { researcher_quote: 'Try my project!' }

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}/(\\d+)`,
        fixtures: (match, params, headers) => {
          actualHeaders = headers
          return expectedPutResponse
        },
        put: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should error if id argument is not a string', function () {
      return projects.update({ id: 2 }).catch((error) => {
        expect(error.message).to.equal('Projects: Update request id must be a string.')
      })
    })

    it('should error if data argument is falsy', function () {
      return projects.update({ data: update }).catch((error) => {
        expect(error.message).to.equal('Projects: Update request missing project id.')
      })
    })

    it('should error if data argument is falsy', function () {
      return projects.update({ id: '2' }).catch((error) => {
        expect(error.message).to.equal('Projects: Update request missing data to post.')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return projects.update({ id: '2', data: update, authorization: '12345' }).then((response) => {
        expect(actualHeaders['Authorization']).to.exist
        expect(actualHeaders['Authorization']).to.equal('12345')
      })
    })

    it('should return the expected response', function () {
      return projects.update({ id: '2', data: update }).then((response) => {
        expect(response).to.eql({ body: expectedPutResponse })
      })
    })
  })

  describe('delete', function () {
    let superagentMock
    let actualHeaders
    const responseStatus = { status: 204 }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}/(\\d+)`,
        fixtures: (match, params, headers) => {
          actualHeaders = headers
          return responseStatus
        },
        delete: (match, data) => { return data }
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should error if the request is missing a project id', function () {
      return projects.delete().catch((error) => {
        expect(error.message).to.equal('Projects: Delete request missing project id.')
      })
    })

    it('should error if the request project id is an empty string', function () {
      return projects.delete({ id: '' }).catch((error) => {
        expect(error.message).to.equal('Projects: Delete request missing project id.')
      })
    })

    it('should error if the request\'s project id is not a string', function () {
      return projects.delete({ id: 2 }).catch((error) => {
        expect(error.message).to.equal('Projects: Delete request id must be a string.')
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return projects.delete({ id: '2', authorization: '12345' }).then((response) => {
        expect(actualHeaders['Authorization']).to.exist
        expect(actualHeaders['Authorization']).to.equal('12345')
      })
    })

    it('should return the expected response', function () {
      return projects.delete({ id: '2' }).then((response) => {
        expect(response).to.equal(responseStatus)
      })
    })
  })
})
