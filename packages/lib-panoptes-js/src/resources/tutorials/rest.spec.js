import nock from 'nock'

import { config } from '../../config'
import { responses } from './mocks'
import { endpoint } from './helpers'
import tutorials from './index'

describe('Tutorials resource REST requests', function () {
  describe('get', function () {
    const expectedGetAllResponse = responses.get.tutorials
    const expectedGetSingleResponse = responses.get.tutorial
    const scope = nock(config.host)

    describe('by workflow id', function () {
      beforeEach(function () {
        scope
          .get(endpoint)
          .query(true)
          .reply(200, expectedGetAllResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should error if the workflow id is not defined', async function () {
        try {
          await tutorials.get()
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Tutorials: Get request must include a workflow id or a tutorial id.')
        }
      })

      it('should error if the workflow id is not a string', async function () {
        try {
          await tutorials.get({ workflowId: 10 })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Tutorials: Get request workflow id must be a string.')
        }
      })

      it('should return the expected response', async function () {
        const response = await tutorials.get({ workflowId: '10' })
        expect(response.body).to.eql(expectedGetAllResponse)
      })

      it('should add the Authorization header to the request if param is defined', async function () {
        const response = await tutorials.get({ workflowId: '1', authorization: '12345' })
        expect(response.req.headers.authorization).to.equal('12345')
      })
    })

    describe('by tutorial id', function () {
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(`${endpoint}/1`)
          .query(true)
          .reply(200, expectedGetSingleResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should error if the tutorial id is not defined', async function () {
        try {
          await tutorials.get()
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Tutorials: Get request must include a workflow id or a tutorial id.')
        }
      })

      it('should error if the tutorial id is not a string', async function () {
        try {
          await tutorials.get({ id: 1 })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Tutorials: Get request id must be a string.')
        }
      })

      it('should return the expected response', async function () {
        const response = await tutorials.get({ id: '1' })
        expect(response.body).to.eql(expectedGetSingleResponse)
      })

      it('should add the Authorization header to the request if param is defined', async function () {
        const response = await tutorials.get({ id: '1', authorization: '12345' })
        expect(response.req.headers.authorization).to.equal('12345')
      })
    })
  })
})
