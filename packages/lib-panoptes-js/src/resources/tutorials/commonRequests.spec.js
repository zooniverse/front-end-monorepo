const { expect } = require('chai')
const nock = require('nock')

const tutorials = require('./index')
const { endpoint } = require('./helpers')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')

describe('Tutorials resource common requests', function () {
  let scope

  describe('getAttachedImages', function () {
    const expectedGetResponse = responses.get.attachedImage

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
      const response = await tutorials.getAttachedImages({ id: '1', query: { page: '2' }})
      expect(response.req.path.includes('page=2')).to.be.true
    })

    it('should add the Authorization header to the request if param is defined', async function () {
      const response = await tutorials.getAttachedImages({ id: '1', authorization: '12345' })
      expect(response.req.headers.authorization).to.equal('12345')
    })
  })

  describe('getWithImages', function () {
    describe('a single tutorial', function () {
      const expectedGetResponse = responses.get.tutorialWithImages

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

      it('should use a default include query param', async function () {
        const response = await tutorials.getWithImages({ id: '1' })
        expect(response.req.path.includes('include=attached_images')).to.be.true
      })

      it('should include any other query params if defined', async function () {
        const response = await tutorials.getWithImages({ id: '1', query: { page: '2' }})
        expect(response.req.path.includes('page=2')).to.be.true
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getWithImages({ id: '1' })
        expect(response.body).to.eql(expectedGetResponse)
      })
    })

    describe('many tutorials', function () {
      const expectedGetResponse = responses.get.tutorialsWithImages

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

      it('should use a default include query param', async function () {
        const response = await tutorials.getWithImages({ workflowId: '10' })
        expect(response.req.path.includes('include=attached_images')).to.be.true
      })

      it('should include any other query params if defined', async function () {
        const response = await tutorials.getWithImages({ workflowId: '10', query: { page: '2' } })
        expect(response.req.path.includes('page=2')).to.be.true
      })

      it('should return the expected response', async function () {
        const response = await tutorials.getWithImages({ workflowId: '10' })
        expect(response.body).to.eql(expectedGetResponse)
      })
    })
  })

  describe('getTutorials', function () {
    describe('by tutorial id', function () {
      before(function () {
        scope = nock(config.host)
          .persist()
          .get(uri => uri.includes(endpoint))
          .query(true)
          .reply(200, (uri, requestBody) => {
            if (uri.includes(resources.tutorialOne.id)) {
              return responses.get.tutorial
            }
            if (uri.includes(resources.minicourse.id)) {
              return responses.get.minicourse
            }
          })
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

      it('should return the expected response', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        const expectedResponse = Object.assign({}, expectedGetResponse)
        expectedResponse.tutorials = expectedResponse.tutorials.filter(t => t.kind !== 'mini-course')
        expect(response.body).to.eql(expectedResponse)
      })

      it('should use the workflow id as the query param', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        expect(response.req.path.includes('workflow_id=10')).to.be.true
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

      it('should return the expected response', async function () {
        const response = await tutorials.getMinicourses({ id: '52' })
        expect(response.body).to.eql(expectedGetResponse)
      })

      it('should set a default query parameter for kind', async function () {
        const response = await tutorials.getMinicourses({ id: '52' })
        expect(response.req.path.includes('kind=mini-course')).to.be.true
      })
    })

    describe('by workflow id', function () {
      const expectedGetResponse = responses.get.minicourse

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

      it('should return the expected response', async function () {
        const response = await tutorials.getMinicourses({ workflowId: '10' })
        expect(response.body).to.eql(expectedGetResponse)
      })

      it('should set a default query parameter for kind', async function () {
        const response = await tutorials.getMinicourses({ workflowId: '10' })
        expect(response.req.path.includes('kind=mini-course')).to.be.true
      })

      it('should use the workflow id as the query param', async function () {
        const response = await tutorials.getTutorials({ workflowId: '10' })
        expect(response.req.path.includes('workflow_id=10')).to.be.true
      })
    })
  })
})
