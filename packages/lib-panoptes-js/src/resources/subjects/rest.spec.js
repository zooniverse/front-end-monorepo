import nock from 'nock'

import { config } from '../../config.js'
import { responses } from './mocks.js'
import { endpoint } from './helpers.js'
import subjects from './index.js'

describe('Subjects resource REST requests', function () {
  describe('get', function () {
    const expectedGetResponse = responses.get.subject
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .get(`${endpoint}/10`)
        .query(true)
        .reply(200, expectedGetResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should error if request does not have a subject id', async function () {
      try {
        await subjects.get()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Subjects: Get request must include a subject id.')
      }
    })

    it('should error if the subject id is not a string', async function () {
      try {
        await subjects.get({ id: 1 })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Subjects: Get request id must be a string.')
      }
    })

    it('should return the expected response', async function () {
      const response = await subjects.get({ id: '10' })
      expect(response.body).to.eql(expectedGetResponse)
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await subjects.get({ id: '10', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })
})
