import nock from 'nock'

import projects from './index'
import { endpoint } from './helpers'
import { config } from '../../config'
import { responses } from './mocks'

describe('Projects resource REST requests', function () {
  describe('create', function () {
    const expectedResponse = responses.post.createdProject
    const scope = nock(config.host)

    // We save the request body here in order to make assertions on the
    // content _without_ accessing a private property in Nock.
    let reqBody

    beforeEach(function () {
      scope
        .post(
          endpoint,
          body => { reqBody = body; return body }
        )
        .query(true)
        .reply(200, expectedResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should return the expected response', async function () {
      const response = await projects.create()
      expect(response.body).to.eql(expectedResponse)
    })

    it('should have sent the expected data params with an added { private: true }', async function () {
      const projectDisplayName = { display_name: 'My project' }
      await projects.create({ data: projectDisplayName })
      expect(reqBody).to.eql(Object.assign({}, { private: true }, projectDisplayName))
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await projects.create({ authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })

  describe('get', function () {
    describe('many projects', function () {
      const expectedGetAllResponse = responses.get.projects
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(endpoint)
          .query(true)
          .reply(200, expectedGetAllResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should return the expected response without a defined id argument', async function () {
        const response = await projects.get()
        expect(response.body).to.eql(expectedGetAllResponse)
      })

      it('should add the Authorization header to the request if param is defined', async function () {
        const response = await projects.get({ authorization: '12345' })
        expect(response.req.headers.authorization).to.equal('12345')
      })
    })

    describe('a single project', function () {
      const expectedGetSingleResponse = responses.get.project
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(`${endpoint}/2`)
          .query(true)
          .reply(200, expectedGetSingleResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should add the Authorization header to the request if param is defined', async function () {
        const response = await projects.get({ authorization: '12345', id: '2' })
        expect(response.req.headers.authorization).to.equal('12345')
      })

      it('should return the expected response with a defined id argument', async function () {
        const response = await projects.get({ id: '2' })
        expect(response.body).to.eql(expectedGetSingleResponse)
      })

      it('should include query params with the request if defined', async function () {
        const queryParams = { page: '2' }
        const response = await projects.get({ id: '2', query: queryParams })
        expect(response.req.path.includes('?page=2')).to.equal(true)
      })

      it('should error if id arugment is not a string', async function () {
        try {
          await projects.get({ id: 2 })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Projects: Get request id must be a string.')
        }
      })
    })
  })

  describe('update', function () {
    const expectedPutResponse = responses.put.updatedProject
    const update = { researcher_quote: 'Try my project!' }
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .put(`${endpoint}/2`)
        .query(true)
        .reply(200, expectedPutResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should error if id argument is not a string', async function () {
      try {
        await projects.update({ id: 2 })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Update request id must be a string.')
      }
    })

    it('should error if data argument is falsy', async function () {
      try {
        await projects.update({ data: update })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Update request missing project id.')
      }
    })

    it('should error if data argument is falsy', async function () {
      try {
        await projects.update({ id: '2' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Update request missing data to post.')
      }
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await projects.update({ id: '2', data: update, authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })

    it('should return the expected response', async function () {
      const response = await projects.update({ id: '2', data: update })
      expect(response.body).to.eql(expectedPutResponse)
    })
  })

  describe('delete', function () {
    const responseStatus = 204
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .delete(`${endpoint}/2`)
        .query(true)
        .reply(responseStatus)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should error if the request is missing a project id', async function () {
      try {
        await projects.delete()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Delete request missing project id.')
      }
    })

    it('should error if the request project id is an empty string', async function () {
      try {
        await projects.delete({ id: '' })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Delete request missing project id.')
      }
    })

    it('should error if the request\'s project id is not a string', async function () {
      try {
        await projects.delete({ id: 2 })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Delete request id must be a string.')
      }
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await projects.delete({ id: '2', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })

    it('should return the expected response', async function () {
      const response = await projects.delete({ id: '2' })
      expect(response.status).to.equal(responseStatus)
    })
  })
})
