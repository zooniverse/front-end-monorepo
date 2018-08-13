const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')
const { endpoint } = require('./helpers')
const tutorials = require('./index')

describe('Tutorials resource REST requests', function () {
  describe('get', function () {
    let superagentMock
    let actualHeaders
    const expectedGetAllResponse = responses.get.tutorials
    const expectedGetSingleResponse = responses.get.tutorial
    const queryNotFound = responses.get.queryNotFound

    describe('by workflow id', function () {
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params, headers, context) => {
            actualHeaders = headers
            if (match.input.includes('?workflow_id=10')) return expectedGetAllResponse

            return queryNotFound
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should error if the workflow id is not defined', function () {
        return tutorials.get().catch((error) => {
          expect(error.message).to.equal('Tutorials: Get request must include a workflow id or a tutorial id.')
        })
      })

      it('should error if the workflow id is not a string', function () {
        return tutorials.get({ workflowId: 10 }).catch((error) => {
          expect(error.message).to.equal('Tutorials: Get request workflow id must be a string.')
        })
      })

      it('should return the expected response', function () {
        return tutorials.get({ workflowId: '10' }).then((response) => {
          expect(response.body).to.eql(expectedGetAllResponse)
        })
      })

      it('should add the Authorization header to the request if param is defined', function () {
        return tutorials.get({ workflowId: '1', authorization: '12345' }).then((response) => {
          expect(actualHeaders['Authorization']).to.exist
          expect(actualHeaders['Authorization']).to.equal('12345')
        })
      })
    })

    describe('by tutorial id', function () {
      let actualHeaders
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params, headers, context) => {
            actualHeaders = headers
            if (match.input.includes(expectedGetSingleResponse.tutorials[0].id)) return expectedGetSingleResponse

            return { status: 404 }
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should error if the tutorial id is not defined', function () {
        return tutorials.get().catch((error) => {
          expect(error.message).to.equal('Tutorials: Get request must include a workflow id or a tutorial id.')
        })
      })

      it('should error if the tutorial id is not a string', function () {
        return tutorials.get({ id: 1 }).catch((error) => {
          expect(error.message).to.equal('Tutorials: Get request id must be a string.')
        })
      })

      it('should return the expected response', function () {
        return tutorials.get({ id: '1' }).then((response) => {
          expect(response.body).to.eql(expectedGetSingleResponse)
        })
      })

      it('should add the Authorization header to the request if param is defined', function () {
        return tutorials.get({ id: '1', authorization: '12345' }).then((response) => {
          expect(actualHeaders['Authorization']).to.exist
          expect(actualHeaders['Authorization']).to.equal('12345')
        })
      })
    })
  })
})
