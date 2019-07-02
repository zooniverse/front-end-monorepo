const { expect } = require('chai')
const nock = require('nock')

const { config } = require('../../config')
const { responses } = require('./mocks')
const { queuedEndpoint } = require('./helpers')
const subjects = require('./index')

describe('Subjects resource common requests', function () {
  describe('getSubjectQueue', function () {
    const expectedGetResponse = responses.get.subjectQueue

    before(function () {
      nock(config.host)
        .persist()
        .get(uri => uri.includes(queuedEndpoint))
        .query(true)
        .reply(200, expectedGetResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should return a error if the request does not have a workflow id', async function () {
      try {
        await subjects.getSubjectQueue()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Subjects: Get request must include a workflow id.')
      }
    })

    it('should error if the workflow id is not a string', async function () {
      try {
        await subjects.getSubjectQueue({ workflowId: 10 })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Subjects: Get request workflow id must be a string.')
      }
    })

    it('should error if the subject set id is not a string', async function () {
      try {
        await subjects.getSubjectQueue({ subjectSetId: 40, workflowId: '10' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Subjects: Get request subject set id must be a string.')
      }
    })

    it('should return the expected response', async function () {
      const response = await subjects.getSubjectQueue({ workflowId: '10' })
      expect(response.body).to.eql(expectedGetResponse)
    })

    it('should use the subject set id in the request query params if defined', async function () {
      const response = await subjects.getSubjectQueue({ subjectSetId: '40', workflowId: '10' })
      expect(response.req.path.includes('subject_set_id=40')).to.be.true()
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await subjects.getSubjectQueue({ workflowId: '10', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })
})
