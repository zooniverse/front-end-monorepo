const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')
const { endpoint } = require('./helpers')
const { tutorials } = require('./index')

describe('Tutorials resource REST requests', function () {
  describe('get', function () {
    let superagentMock
    const expectedGetAllResponse = responses.get.tutorials
    const expectedGetSingleResponse = responses.get.tutorial
    
    describe('many tutorials', function () {
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params, headers, context) => {
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

      it('should error if the tutorial id or the workflow id is not defined', function () {
        return tutorials.get().catch((error) => {
          expect(error).to.equal('Tutorials: Get request must include a workflow id or a tutorial id.')
        })
      })

      it('should error if the tutorial id is not a string', function () {
        return tutorials.get({ id: 1 }).catch((error) => {
          expect(error).to.equal('Tutorials: Get request id must be a string.')
        })
      })

      it('should error if the workflow id is not a string', function () {
        return tutorials.get({ workflowId: 10 }).catch((error) => {
          expect(error).to.equal('Tutorials: Get request workflow id must be a string.')
        })
      })
    })

    describe('a single tutorial', function () {
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params, headers, context) => {
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
    })
  })
})
