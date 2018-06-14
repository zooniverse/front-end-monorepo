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
        expect(response).to.deep.equal({ body: expectedResponse }) // deep equality
      }).catch(err => console.error('error', err))
    })

    it('should have sent the expected data params with an added { private: true }', function () {
      const projectDisplayName = { display_name: 'My project' }
      return projects.create({ data: projectDisplayName }).then(response => {
        expect(actualParams).to.deep.equal(Object.assign({}, { private: true }, projectDisplayName))
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
          expect(response).to.deep.equal({ body: expectedGetAllResponse })
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
          expect(response).to.deep.equal({ body: expectedGetSingleResponse })
        })
      })

      it('should include query params with the request if defined', function () {
        const queryParams = { page: '2' }

        return projects.get({ id: '2', query: queryParams }).then(response => {
          // eslint-disable-next-line no-unused-expressions
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

  describe('getBySlug', function () {
    let superagentMock
    const expectedGetResponse = projectMocks.getSingleProjectResponse
    const expectedNotFoundResponse = projectMocks.notFoundResponse

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${projectsEndpoint}`,
        fixtures: (match, params) => {
          const [mockOwner, mockProjectName] = expectedGetResponse.projects[0].slug.split('/')
          const matchSlug = `${mockOwner}%2F${mockProjectName}`

          if (match.input.includes(matchSlug)) return expectedGetResponse

          return expectedNotFoundResponse
        },
        get: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should error if slug param is not a string', function () {
      return projects.getBySlug({ slug: 1234 }).catch((error) => {
        expect(error).to.equal('Projects: Get request slug must be a string.')
      })
    })

    it('should return the expected response if not found', function () {
      return projects.getBySlug({ slug: 'zooniverse/my-project' }).then((response) => {
        expect(response).to.eql({ body: expectedNotFoundResponse })
      })
    })

    it('should error if slug param is not defined', function () {
      return projects.getBySlug().catch((error) => {
        expect(error).to.equal('Projects: Get by slug request missing required parameter: slug string.')
      })
    })

    it('should return the expected response if the slug is defined', function () {
      const slug = 'user/untitled-project-2'
      return projects.getBySlug({ slug }).then((response) => {
        expect(response).to.eql({ body: expectedGetResponse })
      })
    })

    it('should return the expected response if the slug is defined including "projects" in the pathname', function () {
      const slug = 'projects/user/untitled-project-2'
      return projects.getBySlug({ slug }).then((response) => {
        expect(response).to.eql({ body: expectedGetResponse })
      })
    })
  })

  describe('getWithLinkedResources', function () {
    let superagentMock
    const expectedGetResponseWithLinkedResources = projectMocks.getProjectResponseWithLinkedResources
    const expectedNotFoundResponse = projectMocks.notFoundResponse

    after(function () {
      superagentMock.unset()
    })

    describe('in node', function () {
      it('should error if neither a slug or id is defined in query parameters', function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${projectsEndpoint}`,
          fixtures: (match, params) => {
            return expectedGetResponseWithLinkedResources
          },
          get: (match, data) => ({ body: data })
        }])

        return projects.getWithLinkedResources().catch((error) => {
          expect(error).to.equal('Projects: Get request must have either project id or slug.')
        })
      })

      describe('using project slug query parameter', function () {
        before(function () {
          superagentMock = mockSuperagent(superagent, [{
            pattern: `${config.host}${projectsEndpoint}`,
            fixtures: (match, params) => {
              const [mockOwner, mockProjectName] = expectedGetResponseWithLinkedResources.projects[0].slug.split('/')
              const matchSlug = `${mockOwner}%2F${mockProjectName}`

              if (match.input.includes(matchSlug)) return expectedGetResponseWithLinkedResources
              return expectedNotFoundResponse
            },
            get: (match, data) => ({ body: data })
          }])
        })

        it('should error if slug is not a string', function () {
          return projects.getWithLinkedResources({ slug: 1234 }).catch((error) => {
            expect(error).to.equal('Projects: Get request slug must be a string.')
          })
        })

        it('should error if the slug is not defined', function () {
          return projects.getWithLinkedResources().catch((error) => {
            expect(error).to.equal('Projects: Get request must have either project id or slug.')
          })
        })

        it('should return the expected response', function () {
          return projects.getWithLinkedResources({ slug: 'user/untitled-project-2' }).then((response) => {
            expect(response).to.eql({ body: expectedGetResponseWithLinkedResources })
          })
        })
      })

      describe('using project id', function () {
        before(function () {
          superagentMock = mockSuperagent(superagent, [{
            pattern: `${config.host}${projectsEndpoint}/(\\d+)`,
            fixtures: (match, params) => {
              const projectID = expectedGetResponseWithLinkedResources.projects[0].id
              const expectedQuery = 'include=avatar%2Cbackground%2Cowners%2Cpages'
              const [url, query] = match.input.split('?')

              if (url.includes(projectID) && query === expectedQuery) return expectedGetResponseWithLinkedResources
              return expectedNotFoundResponse
            },
            get: (match, data) => ({ body: data })
          }])
        })

        it('should error if id is not a string', function () {
          return projects.getWithLinkedResources({ id: 1234 }).catch((error) => {
            expect(error).to.equal('Projects: Get request id must be a string.')
          })
        })

        it('should error if the id is not defined', function () {
          return projects.getWithLinkedResources().catch((error) => {
            expect(error).to.equal('Projects: Get request must have either project id or slug.')
          })
        })

        it('should return the expected response', function () {
          return projects.getWithLinkedResources({ id: '2' }).then((response) => {
            expect(response).to.eql({ body: expectedGetResponseWithLinkedResources })
          })
        })
      })
    })

    describe('in browser', function () {
      let jsdom
      describe('using project slug query parameter', function () {
        before(function () {
          superagentMock = mockSuperagent(superagent, [{
            pattern: `${config.host}${projectsEndpoint}`,
            fixtures: (match, params) => {
              const [mockOwner, mockProjectName] = expectedGetResponseWithLinkedResources.projects[0].slug.split('/')
              const matchSlug = `${mockOwner}%2F${mockProjectName}`
              if (match.input.includes(matchSlug)) return expectedGetResponseWithLinkedResources
              return expectedNotFoundResponse
            },
            get: (match, data) => ({ body: data })
          }])

          jsdom = new JSDOM('<!doctype html><html><body></body></html>')
          global.window = jsdom.window
          jsdom.reconfigure({ url: 'https://www.zooniverse.org/projects/user/untitled-project-2' })
        })

        after(function () {
          jsdom.reconfigure({ url: 'about:blank' })
          delete global.window
        })

        it('should error if the slug is not a string', function() {
          return projects.getWithLinkedResources({ slug: 1234 }).catch((error) => {
            expect(error).to.equal('Projects: Get request slug must be a string.')
          })
        })

        it('should return the expected response if the slug is not defined using the window location pathname', function() {
          return projects.getWithLinkedResources().then((response) => {
            expect(response).to.eql({ body: expectedGetResponseWithLinkedResources })
          })
        })

        it('should return the expected response if the slug is defined', function () {
          return projects.getWithLinkedResources({ slug: 'user/untitled-project-2' }).then((response) => {
            expect(response).to.eql({ body: expectedGetResponseWithLinkedResources })
          })
        })
      })

      describe('using project ID', function () {
        before(function () {
          superagentMock = mockSuperagent(superagent, [{
            pattern: `${config.host}${projectsEndpoint}/(\\d+)`,
            fixtures: (match, params) => {
              const projectID = expectedGetResponseWithLinkedResources.projects[0].id
              const expectedQuery = 'include=avatar%2Cbackground%2Cowners%2Cpages'
              const [url, query] = match.input.split('?')
              if (url.includes(projectID) && query === expectedQuery) return expectedGetResponseWithLinkedResources
              return expectedNotFoundResponse
            },
            get: (match, data) => ({ body: data })
          }])

          jsdom = new JSDOM('<!doctype html><html><body></body></html>')
          global.window = jsdom.window
          jsdom.reconfigure({ url: 'https://www.zooniverse.org/projects/user/untitled-project-2' })
        })

        after(function () {
          jsdom.reconfigure({ url: 'about:blank' })
          delete global.window
        })

        it('should error if id is not a string', function () {
          return projects.getWithLinkedResources({ id: 1234 }).catch((error) => {
            expect(error).to.equal('Projects: Get request id must be a string.')
          })
        })

        it('should return the expected response', function () {
          return projects.getWithLinkedResources({ id: '2' }).then((response) => {
            expect(response).to.eql({ body: expectedGetResponseWithLinkedResources })
          })
        })
      })
    })
  });

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
        expect(response).to.deep.equal({ body: expectedPutResponse })
      })
    })
  })

  describe('delete', function () {
    let superagentMock
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
