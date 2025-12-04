import nock from 'nock'

import { config } from '../../config.js'
import { responses } from './mocks.js'
import { endpoint } from './helpers.js'
import collections from './index.js'

describe('Collections resource REST requests', function () {
  describe('get', function () {
    describe('with a collection ID', function () {
      const expectedGetResponse = responses.get.collection
      const scope = nock(config.host)

      before(function () {
        scope
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
      const scope = nock(config.host)

      before(function () {
        scope
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
      const scope = nock(config.host)

      before(function () {
        scope
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

  describe('update', function () {
    const data = {
      display_name: 'my test collection'
    }
    const expectedPutResponse = Object.assign({}, responses.get.collection, data)
    const requestBody = { collections: data }
    const scope = nock(config.host)

    before(function () {
      scope
        .put(`${endpoint}/10`, requestBody)
        .query(true)
        .reply(200, expectedPutResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should raise an error if a collection is not specified', async function () {
      try {
        await collections.update({})
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections: Update request id must be present.')
      }
    })

    it('should raise an error if no changes are specified', async function () {
      try {
        await collections.update({ id: '10' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collection update: payload not supplied.')
      }
    })

    it('should update the specified collection', async function () {
      const response = await collections.update({ id: '10', data })
      expect(response.body).to.eql(expectedPutResponse)
    })
  })

  describe('create', function () {
    const expectedCreateResponse = responses.get.collection
    const data = {
      display_name: 'test collection'
    }
    const links = {
      project: '2',
      subjects: []
    }
    const changes = Object.assign({}, data, { links })
    const payload = { collections: changes }
    const scope = nock(config.host)

    before(function () {
      scope
        .post(`${endpoint}`, payload)
        .query(true)
        .reply(201, expectedCreateResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should create a new collection', async function () {
      const response = await collections.create({ data, project: '2' })
      expect(response.body).to.eql(expectedCreateResponse)
    })
  })

  describe('delete', function () {
    const expectedDeleteResponse = {}
    const scope = nock(config.host)

    before(function () {
      scope
        .delete(`${endpoint}/10`)
        .query(true)
        .reply(200, expectedDeleteResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should raise an error if a collection is not specified', async function () {
      try {
        await collections.delete({})
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections: Delete request id must be present.')
      }
    })

    it('should delete the specified collection', async function () {
      const response = await collections.delete({ id: '10' })
      expect(response.body).to.eql(expectedDeleteResponse)
    })
  })

  describe('add subjects', function () {
    const expectedAddResponse = responses.get.collection
    const subjects = ['2']
    const scope = nock(config.host)

    before(function () {
      scope
        .post(`${endpoint}/10/links/subjects`, { subjects })
        .query(true)
        .reply(200, expectedAddResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should raise an error if a collection is not specified', async function () {
      try {
        await collections.addSubjects({})
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections add subject: collections ID is required.')
      }
    })

    it('should raise an error if subjects is not an array', async function () {
      try {
        await collections.addSubjects({ id: '10', subjects: '2' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections add subjects: subjects array is required.')
      }
    })

    it('should add subjects to the specified collection', async function () {
      const response = await collections.addSubjects({ id: '10', subjects })
      expect(response).toBeDefined()
    })
  })

  describe('remove subjects', function () {
    const expectedDeleteResponse = {}
    const scope = nock(config.host)

    before(function () {
      scope
        .matchHeader('authorization', 'Bearer 1234')
        .delete(`${endpoint}/10/links/subjects/2`)
        .query(true)
        .reply(200, expectedDeleteResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should raise an error if a collection is not specified', async function () {
      try {
        await collections.removeSubjects({})
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections remove subject: collections ID is required.')
      }
    })

    it('should raise an error if subjects is not an array', async function () {
      try {
        await collections.removeSubjects({ id: '10', subjects: '2' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Collections remove subjects: subjects array is required.')
      }
    })

    it('should unlink the specified subjects', async function () {
      const response = await collections.removeSubjects({ id: '10', subjects: ['2'], authorization: 'Bearer 1234' })
      expect(response).toBeDefined()
    })
  })
})
