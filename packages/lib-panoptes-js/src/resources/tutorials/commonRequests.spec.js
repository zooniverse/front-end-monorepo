import nock from 'nock'

import tutorials from './index.js'
import { endpoint } from './helpers.js'
import { config } from '../../config.js'
import { responses } from './mocks.js'

describe('Tutorials resource common requests', function () {
  describe('getAttachedImages', function () {
    const expectedGetResponse = responses.get.attachedImage
    const scope = nock(config.host)

    beforeEach(function () {
      scope
        .get(`${endpoint}/1/attached_images`)
        .query(true)
        .reply(200, expectedGetResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should return an error if there is no tutorial id', async function () {
      try {
        await tutorials.getAttachedImages()
        expect.fail()
      } catch (error) {
        expect(error.message).to.equal('Tutorials: getAttachedImages request requires a tutorial id.')
      }
    })

    it('should return the expected response', async function () {
      const response = await tutorials.getAttachedImages({ id: '1' })
      expect(response.body).to.eql(expectedGetResponse)
    })

    it('should use query params if defined', async function () {
      const response = await tutorials.getAttachedImages({ id: '1', query: { page: '2' } })
      expect(response.req.path.includes('page=2')).to.equal(true)
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await tutorials.getAttachedImages({ id: '1', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })

  describe('getTutorials', function () {
    describe('by tutorial id', function () {
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(`${endpoint}/1`)
          .query(true)
          .reply(200, responses.get.tutorial)
          .get(`${endpoint}/52`)
          .query(true)
          .reply(200, responses.get.minicourse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getTutorials({ id: '1' })
        expect(response.body).to.eql(responses.get.tutorial)
      })

      it('the expected response should be the tutorial kind', async function () {
        const response = await tutorials.getTutorials({ id: '1' })
        const tutorial = response.body.tutorials[0]
        expect(tutorial.kind).to.equal('tutorial')
      })

      it('should not return a minicourse', async function () {
        const response = await tutorials.getTutorials({ id: '52' })
        expect(response.body.tutorials).to.have.lengthOf(0)
      })
    })

    describe('by workflow id', function () {
      const expectedGetResponse = responses.get.allTutorialsForWorkflow
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(endpoint)
          .query(true)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        const expectedResponse = Object.assign({}, expectedGetResponse)
        expectedResponse.tutorials = expectedResponse.tutorials.filter(t => t.kind !== 'mini-course')
        expect(response.body).to.eql(expectedResponse)
      })

      it('should use the workflow id as the query param', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        expect(response.req.path.includes('workflow_id=10')).to.equal(true)
      })

      it('should not return minicourse kind tutorials', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        const tutorialsResponse = response.body.tutorials
        tutorialsResponse.forEach((tutorial) => {
          expect(tutorial.kind).to.not.equal('mini-course')
        })
      })
    })
  })

  describe('getMinicourses', function () {
    describe('by tutorial id', function () {
      const expectedGetResponse = responses.get.minicourse
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(`${endpoint}/52`)
          .query(true)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getMinicourses({ id: '52' })
        expect(response.body).to.eql(expectedGetResponse)
      })

      it('should set a default query parameter for kind', async function () {
        const response = await tutorials.getMinicourses({ id: '52' })
        expect(response.req.path.includes('kind=mini-course')).to.equal(true)
      })
    })

    describe('by workflow id', function () {
      const expectedGetResponse = responses.get.minicourse
      const scope = nock(config.host)

      beforeEach(function () {
        scope
          .get(endpoint)
          .query(true)
          .reply(200, expectedGetResponse)
      })

      after(function () {
        nock.cleanAll()
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getMinicourses({ workflowId: '10' })
        expect(response.body).to.eql(expectedGetResponse)
      })

      it('should set a default query parameter for kind', async function () {
        const response = await tutorials.getMinicourses({ workflowId: '10' })
        expect(response.req.path.includes('kind=mini-course')).to.equal(true)
      })

      it('should use the workflow id as the query param', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        expect(response.req.path.includes('workflow_id=10')).to.equal(true)
      })
    })
  })
})
