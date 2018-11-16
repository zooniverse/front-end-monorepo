import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'

import Project from './Project'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

let clientStub
let projectStore
let rootStore
const { mocks } = projects

describe('Stores > Project', function () {
  it('should exist', function () {
    rootStore = Store.create({}, placeholderEnv)
    projectStore = rootStore.project
    projectStore.should.not.be.undefined
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({}, placeholderEnv)
      projectStore = rootStore.project
    })

    it('should have a `displayName` property', function () {
      expect(projectStore.displayName).to.be.null
    })

    it('should have a `background` property', function () {
      expect(projectStore.background).to.be.an('object')
    })

    it('should have an `error` property', function () {
      expect(projectStore.error).to.be.an('object')
    })

    it('should have an `id` property', function () {
      expect(projectStore.id).to.be.null
    })

    it('should have a `slug` property', function () {
      projectStore.slug.should.equal('')
    })

    it('should have a `state` property', function () {
      projectStore.loadingState.should.equal(asyncStates.initialized)
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })

  describe('fetch method', function () {
    before(function () {
      clientStub = {
        projects: {
          get: function () {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          }
        }
      }
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project
    })

    it('should exist', function () {
      projectStore.fetch.should.be.a('function')
    })

    it('should fetch a valid project resource', function (done) {
      projectStore.loadingState.should.equal(asyncStates.initialized)

      projectStore.fetch('foo/bar')
        .then(function () {
          const { projectBackground, projectTwo } = mocks.resources

          projectStore.background.should.eql(projectTwo.projectBackground)
          projectStore.displayName.should.equal(projectTwo.display_name)
          projectStore.id.should.equal(projectTwo.id)
          projectStore.loadingState.should.equal(asyncStates.success)
          projectStore.slug.should.equal(projectTwo.slug)

          done()
        })

      // Since this is run before fetch's thenable resolves, it should test
      // correctly during the request.
      projectStore.loadingState.should.equal(asyncStates.loading)
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })
})
