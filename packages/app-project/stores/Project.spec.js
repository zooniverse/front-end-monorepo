import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'

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
    expect(projectStore).to.be.ok()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({}, placeholderEnv)
      projectStore = rootStore.project
    })

    it('should have a `displayName` property', function () {
      expect(projectStore.displayName).to.be.null()
    })

    it('should have a `background` property', function () {
      expect(projectStore.background).to.be.an('object')
    })

    it('should have an `error` property', function () {
      expect(projectStore.error).to.be.an('object')
    })

    it('should have an `id` property', function () {
      expect(projectStore.id).to.be.null()
    })

    it('should have a `slug` property', function () {
      expect(projectStore.slug).to.equal('')
    })

    it('should have a `state` property', function () {
      expect(projectStore.loadingState).to.equal(asyncStates.initialized)
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
          getWithLinkedResources: function () {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          }
        }
      }
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project
    })

    it('should exist', function () {
      expect(projectStore.fetch).to.be.a('function')
    })

    it('should fetch a valid project resource', function (done) {
      expect(projectStore.loadingState).to.equal(asyncStates.initialized)

      projectStore.fetch('foo/bar')
        .then(function () {
          const { projectBackground, projectTwo } = mocks.resources

          expect(projectStore.background).to.eql(projectBackground)
          expect(projectStore.displayName).to.equal(projectTwo.display_name)
          expect(projectStore.id).to.equal(projectTwo.id)
          expect(projectStore.loadingState).to.equal(asyncStates.success)
          expect(projectStore.slug).to.equal(projectTwo.slug)
        })
        .then(done, done)

      // Since this is run before fetch's thenable resolves, it should test
      // correctly during the request.
      expect(projectStore.loadingState).to.equal(asyncStates.loading)
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })
})
