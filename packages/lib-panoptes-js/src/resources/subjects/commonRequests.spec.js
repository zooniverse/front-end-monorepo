const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')
const { endpoint } = require('./helpers')
const subjects = require('./index')

describe('Subjects resource common requests', function () {
  describe('getSubjectQueue', function () {
    let superagentMock
    let actualMatch
    const expectedGetResponse = responses.get.subjectsQueue
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params, headers, context) => {
          actualMatch = match
          return expectedGetResponse
        },
        get: (match, data) => {
          return { body: data }
        }
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return a error if the request does not have a workflow id', function () {
      subjects.getSubjectQueue().catch((error) => {
        expect(error.message).to.equal('Subjects: Get request must include a workflow id.')
      })
    })

    it('should error if the workflow id is not a string', function () {
      subjects.getSubjectQueue({ workflowId: 10 }).catch((error) => {
        expect(error.message).to.equal('Subjects: Get request workflow id must be a string.')
      })
    })

    it('should error if the subject set id is not a string', function () {
      subjects.getSubjectQueue({ subjectSetId: 40, workflowId: '10' }).catch((error) => {
        expect(error.message).to.equal('Subjects: Get request subject set id must be a string.')
      })
    })

    it('should return the expected response', function () {
      subjects.getSubjectQueue({ workflowId: '10' }).then((response) => {
        expect(response.body).to.eql(expectedGetResponse)
      })
    })

    it('should use the subject set id in the request query params if defined', function () {
      subjects.getSubjectQueue({ subjectSetId: '40', workflowId: '10' }).then(() => {
        expect(actualMatch.input.includes('subject_set_id=40')).to.be.true
      })
    })
  })
})
