const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { projects, projectsEndpoint } = require('./projects')
const { config } = require('../../config')
const projectMocks = require('./mocks')

describe('Projects resource requests', function () {
  describe('create', function () {
    let superagentMock
    let actualParams
    const expectedResponse = projectMocks.newProjectResponse
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${projectsEndpoint}`,
        fixtures: (match, params, header, context) => {
          actualParams = params
          return expectedResponse
        },
        post: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return the expected response', function () {
      return projects.create().then(response => {
        expect(response).to.eql({ body: expectedResponse }) // deep equality
      }).catch(err => console.error('error', err))
    })

    it('should have sent the expected data params with an added { private: true }', function () {
      const projectDisplayName = { display_name: 'My project' }
      return projects.create({ data: projectDisplayName }).then(response => {
        expect(actualParams).to.eql(Object.assign({}, { private: true }, projectDisplayName))
      })
    })
  })

  describe('get', function () {
    describe('many projects', function () {
      let superagentMock
      const expectedGetAllResponse = projectMocks.getProjectsResponse

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${projectsEndpoint}`,
          fixtures: (match, params, headers, context) => {
            return expectedGetAllResponse
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response without a defined id argument', function () {
        return projects.get().then(response => {
          expect(response).to.eql({ body: expectedGetAllResponse })
        })
      })
    })

    describe('a single project', function () {
      let superagentMock
      let actualMatch
      const expectedGetSingleResponse = projectMocks.getSingleProjectResponse

      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${projectsEndpoint}/(\\d+)`,
          fixtures: (match, params, headers, context) => {
            actualMatch = match
            return expectedGetSingleResponse
          },
          get: (match, data) => {
            return { body: data }
          }
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should return the expected response with a defined id argument', function () {
        return projects.get({ id: '2' }).then(response => {
          expect(response).to.eql({ body: expectedGetSingleResponse })
        })
      })

      it('should include query params with the request if defined', function () {
        const queryParams = { page: '2' }

        return projects.get({ id: '2', query: queryParams }).then(response => {
          expect(actualMatch.input.includes('?page=2')).to.be.true
        })
      })

      it('should error if id arugment is not a string', function () {
        return projects.get({ id: 2 }).catch(error => {
          expect(error).to.equal('Projects: Get request id must be a string.')
        })
      })
    })
  })

  describe('update', function () {
    let superagentMock
    const expectedPutResponse = projectMocks.putProjectResponse
    const update = { researcher_quote: 'Try my project!' }

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${projectsEndpoint}/(\\d+)`,
        fixtures: (match, params) => {
          return expectedPutResponse
        },
        put: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should error if id argument is not a string', function () {
      return projects.update({ id: 2 }).catch((error) => {
        expect(error).to.equal('Projects: Update request id must be a string.')
      })
    })

    it('should error if data argument is falsy', function () {
      return projects.update({ data: update }).catch((error) => {
        expect(error).to.equal('Projects: Update request missing project id.')
      })
    })

    it('should error if data argument is falsy', function () {
      return projects.update({ id: '2' }).catch((error) => {
        expect(error).to.equal('Projects: Update request missing data to post.')
      })
    })

    it('should return the expected response', function () {
      return projects.update({ id: '2', data: update }).then((response) => {
        expect(response).to.eql({ body: expectedPutResponse })
      })
    })
  })

  describe('delete', function () {
    const responseStatus = { status: 204 }
    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${projectsEndpoint}/(\\d+)`,
        fixtures: (match, params) => {
          return responseStatus
        },
        delete: (match, data) => { return data }
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should error if the request is missing a project id', function () {
      return projects.delete().catch((error) => {
        expect(error).to.equal('Projects: Delete request missing project id.')
      })
    })

    it('should error if the request project id is an empty string', function () {
      return projects.delete({ id: '' }).catch((error) => {
        expect(error).to.equal('Projects: Delete request missing project id.')
      })
    })

    it('should error if the request\'s project id is not a string', function () {
      return projects.delete({ id: 2 }).catch((error) => {
        expect(error).to.equal('Projects: Delete request id must be a string.')
      })
    })

    it('should return the expected response', function () {
      return projects.delete({ id: '2' }).then((response) => {
        expect(response).to.equal(responseStatus)
      })
    })
  })
})
