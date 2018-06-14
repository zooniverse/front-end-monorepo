const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')

const { projects } = require('./index')
const { endpoint } = require('./helpers')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')

describe('Projects resource common requests', function () {
  describe('getBySlug', function () {
    let superagentMock;
    const expectedGetResponse = responses.get.project
    const expectedNotFoundResponse = responses.get.queryNotFound

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params) => {
          const [mockOwner, mockProjectName] = resources.projectOne.slug.split('/')
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
    const expectedGetResponseWithLinkedResources = responses.get.projectWithLinkedResources
    const expectedNotFoundResponse = responses.get.queryNotFound

    after(function () {
      superagentMock.unset()
    })

    describe('in node', function () {
      it('should error if neither a slug or id is defined in query parameters', function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
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
            pattern: `${config.host}${endpoint}`,
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
            pattern: `${config.host}${endpoint}/(\\d+)`,
            fixtures: (match, params) => {
              const projectID = expectedGetResponseWithLinkedResources.projects[0].id
              const expectedQuery = 'include=avatar%2Cbackground%2Cowners%2Cpages'
              const [url, query] = match.input.split('?')

              if (url.includes(projectID) && query === expectedQuery) return expectedGetResponseWithLinkedResources
              return new Error(404)
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

        it('should return a 404 if project is not found', function() {
          return projects.getWithLinkedResources({ id: '3' }).catch((error) => {
            expect(error).to.equal(404)
          })
        })
      })
    })

    describe('in browser', function () {
      let jsdom
      describe('using project slug query parameter', function () {
        before(function () {
          superagentMock = mockSuperagent(superagent, [{
            pattern: `${config.host}${endpoint}`,
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

        it('should error if the slug is not a string', function () {
          return projects.getWithLinkedResources({ slug: 1234 }).catch((error) => {
            expect(error).to.equal('Projects: Get request slug must be a string.')
          })
        })

        it('should return the expected response if the slug is not defined using the window location pathname', function () {
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
            pattern: `${config.host}${endpoint}/(\\d+)`,
            fixtures: (match, params) => {
              const projectID = expectedGetResponseWithLinkedResources.projects[0].id
              const expectedQuery = 'include=avatar%2Cbackground%2Cowners%2Cpages'
              const [url, query] = match.input.split('?')
              if (url.includes(projectID) && query === expectedQuery) return expectedGetResponseWithLinkedResources
              throw new Error(404)
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
  })
})