const { expect } = require('chai')
const nock = require('nock')

const { config } = require('../../config')
const { resources, responses } = require('./mocks')
const { endpoint } = require('./helpers')
const collections = require('./index')

describe('Collections resource REST requests', function () {
  describe('get', function () {

    describe('with a collection ID', function () {
      const expectedGetResponse = responses.get.collection
      let scope

      before(function () {
        scope = nock(config.host)
          .persist()
          .get(`${endpoint}/10`)
          .query(true)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should error if the collection ID is not a string', async function () {
        try {
          await collections.get({ id: 1 })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Collections: Get request id must be a string.')
        }
      })

      it('should return a collection', async function () {
        const response = await collections.get({ id: '10' })
        expect(response.body).to.eql(expectedGetResponse)
      })
    })
 
    describe('without a collection ID', function () {
      const expectedGetResponse = responses.get.collections
      const query = {
        project_ids: '1',
        owner: 'test',
        http_cache: 'true'
      }
      let scope

      before(function () {
        scope = nock(config.host)
          .persist()
          .get(`${endpoint}`)
          .query(query)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should query the API for a list of collections', async function () {
        const response = await collections.get({ query })
        expect(response.body).to.eql(expectedGetResponse)
      })
    })

    describe('with an authorization param', function () {
      const expectedGetResponse = responses.get.collection
      let scope

      before(function () {
        scope = nock(config.host)
          .persist()
          .get(uri => uri.includes(endpoint))
          .query(true)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should add the Authorization header to the request', async function () {
        const response = await collections.get({ id: '10', authorization: '12345' })
        expect(response.req.headers.authorization).to.equal('12345')
      })
    })
  })
})
