const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')

const tutorials = require('./index')
const { endpoint } = require('./helpers')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')

describe('Tutorials resource common requests', function () {
  describe('getAttachedImages', function () {
    let superagentMock
    let actualMatch
    let actualHeaders
    const expectedGetResponse = responses.get.attachedImage

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params, header) => {
          actualMatch = match
          actualHeaders = header
          return expectedGetResponse
        },
        get: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return an error if there is no tutorial id', function () {
      return tutorials.getAttachedImages().catch((error) => {
        expect(error.message).to.equal('Tutorials: getAttachedImages request requires a tutorial id.')
      })
    })

    it('should return the expected response', function () {
      return tutorials.getAttachedImages({ id: '1' }).then((response) => {
        expect(response.body).to.eql(expectedGetResponse)
      })
    })

    it('should use query params if defined', function () {
      return tutorials.getAttachedImages({ id: '1', query: { page: '2' }}).then((response) => {
        expect(actualMatch.input.includes('page=2')).to.be.true
      })
    })

    it('should add the Authorization header to the request if param is defined', function () {
      return tutorials.getAttachedImages({ id: '1', authorization: '12345' }).then((response) => {
        expect(actualHeaders['Authorization']).to.exist
        expect(actualHeaders['Authorization']).to.equal('12345')
      })
    })
  })

  describe('getWithImages', function () {
    describe('a single tutorial', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.tutorialWithImages
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            if (match.input.includes(resources.tutorialOne.id)) return expectedGetResponse

            return { status: 404 }
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should use a default include query param', function () {
        return tutorials.getWithImages({ id: '1' }).then((response) => {
          expect(actualMatch.input.includes('include=attached_images')).to.be.true
        })
      })

      it('should include any other query params if defined', function () {
        return tutorials.getWithImages({ id: '1', query: { page: '2' }}).then((response) => {
          expect(actualMatch.input.includes('page=2')).to.be.true
        })
      })

      it('should return the expected response', function () {
        return tutorials.getWithImages({ id: '1' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })
    })

    describe('many tutorials', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.tutorialsWithImages
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            return expectedGetResponse
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should use a default include query param', function () {
        return tutorials.getWithImages({ workflowId: '10' }).then((response) => {
          expect(actualMatch.input.includes('include=attached_images')).to.be.true
        })
      })

      it('should include any other query params if defined', function () {
        return tutorials.getWithImages({ workflowId: '10', query: { page: '2' } }).then((response) => {
          expect(actualMatch.input.includes('page=2')).to.be.true
        })
      })

      it('should return the expected response', function () {
        return tutorials.getWithImages({ workflowId: '10' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })
    })
  })

  describe('getTutorials', function () {
    describe('by tutorial id', function () {
      let superagentMock

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            if (match.input.includes(resources.tutorialOne.id)) return responses.get.tutorial
            if (match.input.includes(resources.minicourse.id)) return responses.get.minicourse

            return { status: 404 }
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response', function () {
        return tutorials.getTutorials({ id: '1' }).then((response) => {
          expect(response.body).to.eql(responses.get.tutorial)
        })
      })

      it('the expected response should be the tutorial kind', function () {
        return tutorials.getTutorials({ id: '1' }).then((response) => {
          const tutorial = response.body.tutorials[0]
          expect(tutorial.kind).to.equal('tutorial')
        })
      })

      it('should not return a minicourse', function () {
        return tutorials.getTutorials({ id: '52' }).then((response) => {
          expect(response.body.tutorials).to.have.lengthOf(0)
        })
      })
    })

    describe('by workflow id', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.allTutorialsForWorkflow
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            if (match.input.includes('workflow_id=10')) return expectedGetResponse

            return { status: 404 }
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response', function () {
        return tutorials.getTutorials({ workflowId: '10' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })

      it('should use the workflow id as the query param', function () {
        return tutorials.getTutorials({ workflowId: '10' }).then((response) => {
          expect(actualMatch.input.includes('workflow_id=10')).to.be.true
        })
      })

      it('should not return minicourse kind tutorials', function () {
        return tutorials.getTutorials({ workflowId: '10' }).then((response) => {
          const tutorialsResponse = response.body.tutorials
          tutorialsResponse.forEach((tutorial) => {
            expect(tutorial.kind).to.not.equal('mini-course')
          })
        })
      })
    })
  })

  describe('getMinicourses', function () {
    describe('by tutorial id', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.minicourse

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            if (match.input.includes(resources.minicourse.id)) return expectedGetResponse

            return { status: 404 }
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response', function () {
        return tutorials.getMinicourses({ id: '52' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })

      it('should set a default query parameter for kind', function () {
        return tutorials.getMinicourses({ id: '52' }).then((response) => {
          expect(actualMatch.input.includes('kind=mini-course')).to.be.true
        })
      })
    })

    describe('by workflow id', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.minicourse

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            return expectedGetResponse
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response', function () {
        return tutorials.getMinicourses({ workflowId: '10' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })

      it('should set a default query parameter for kind', function () {
        return tutorials.getMinicourses({ workflowId: '10' }).then((response) => {
          expect(actualMatch.input.includes('kind=mini-course')).to.be.true
        })
      })

      it('should use the workflow id as the query param', function () {
        return tutorials.getTutorials({ workflowId: '10' }).then((response) => {
          expect(actualMatch.input.includes('workflow_id=10')).to.be.true
        })
      })
    })
  })
})
