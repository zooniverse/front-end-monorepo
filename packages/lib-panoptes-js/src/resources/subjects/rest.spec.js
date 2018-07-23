const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')
const { endpoint } = require('./helpers')
const subjects = require('./index')

describe('Subjects resource REST requests', function () {
  describe('get', function () {
    let superagentMock
    const expectedGetResponse = responses.get.subject
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params, headers, context) => {
          if (match.input.includes(resources.subject.id)) return expectedGetResponse

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

    it('should error if request does not have a subject id', function () {
      subjects.get().catch((error) => {
        expect(error.message).to.equal('Subjects: Get request must include a subject id.')
      })
    })

    it('should error if the subject id is not a string', function () {
      subjects.get({ id: 1 }).catch((error) => {
        expect(error.message).to.equal('Subjects: Get request id must be a string.')
      })
    })

    it('should return the expected response', function () {
      subjects.get({ id: '10' }).then((response) => {
        expect(response.body).to.eql(expectedGetResponse)
      })
    })
  })
})
