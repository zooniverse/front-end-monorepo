import nock from 'nock'

import projects from './index'
import { endpoint } from './helpers'
import { config } from '../../config'
import { responses } from './mocks'

describe('Projects resource common requests', function () {
  describe('getBySlug', function () {
    const expectedGetResponse = responses.get.project
    const expectedNotFoundResponse = responses.get.queryNotFound
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .get(endpoint)
        .query(true)
        .reply(200, (uri, requestBody) =>
          uri.includes(encodeURIComponent('zooniverse/my-project'))
            ? expectedNotFoundResponse
            : expectedGetResponse
        )
    })

    after(function () {
      nock.cleanAll()
    })

    it('should error if slug param is not a string', async function () {
      try {
        await projects.getBySlug({ query: { slug: 1234 } })
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Get request slug must be a string.')
      }
    })

    it('should return the expected response if not found', async function () {
      const response = await projects.getBySlug({ query: { slug: 'zooniverse/my-project' } })
      expect(response.body).to.eql(expectedNotFoundResponse)
    })

    it('should error if slug param is not defined', async function () {
      try {
        await projects.getBySlug()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Get by slug request missing required parameter: slug string.')
      }
    })

    it('should return the expected response if the slug is defined', async function () {
      const slug = 'user/untitled-projects-2'
      const response = await projects.getBySlug({ query: { slug } })
      expect(response.body).to.eql(expectedGetResponse)
    })

    it('should return the expected response if the slug is defined including "projects" in the pathname', async function () {
      const slug = 'projects/user/untitled-project-2'
      const response = await projects.getBySlug({ query: { slug } })
      expect(response.body).to.eql(expectedGetResponse)
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await projects.getBySlug({ authorization: '12345', query: { slug: 'zooniverse/my-project' } })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })

  describe('getWithLinkedResources', function () {
    const expectedGetResponseWithLinkedResources = responses.get.projectWithLinkedResources
    const scope = nock(config.host)

    before(function () {
      scope
        .get(`${endpoint}/2`)
        .query(true)
        .reply(200, expectedGetResponseWithLinkedResources)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should error if neither a slug or id is defined in query parameters', async function () {
      try {
        await projects.getWithLinkedResources()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Projects: Get request must have either project id or slug.')
      }
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await projects.getWithLinkedResources({ id: '2', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })

    describe('using project slug query parameter', function () {
      before(function () {
        scope
          .get(endpoint)
          .query(true)
          .reply(200, expectedGetResponseWithLinkedResources)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should error if slug is not a string', async function () {
        try {
          await projects.getWithLinkedResources({ query: { slug: 1234 } })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Projects: Get request slug must be a string.')
        }
      })

      it('should error if the slug is not defined', async function () {
        try {
          await projects.getWithLinkedResources()
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Projects: Get request must have either project id or slug.')
        }
      })

      it('should return the expected response', async function () {
        const response = await projects.getWithLinkedResources({ query: { slug: 'user/untitled-project-2' } })
        expect(response.body).to.eql(expectedGetResponseWithLinkedResources)
      })
    })

    describe('using project id', function () {
      before(function () {
        scope
          .get(`${endpoint}/2`)
          .query(true)
          .reply(200, expectedGetResponseWithLinkedResources)
          .get(endpoint)
          .query(true)
          .reply(404)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should error if id is not a string', async function () {
        try {
          await projects.getWithLinkedResources({ id: 1234 })
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Projects: Get request id must be a string.')
        }
      })

      it('should error if the id is not defined', async function () {
        try {
          await projects.getWithLinkedResources()
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Projects: Get request must have either project id or slug.')
        }
      })

      it('should return the expected response', async function () {
        const response = await projects.getWithLinkedResources({ id: '2' })
        expect(response.body).to.eql(expectedGetResponseWithLinkedResources)
      })

      it('should return a 404 if project is not found', async function () {
        try {
          await projects.getWithLinkedResources({ id: '3' })
          expect.fail()
        } catch (error) {
          expect(error.status).to.equal(404)
        }
      })
    })
  })
})
