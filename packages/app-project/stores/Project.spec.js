import { expect } from 'chai'
import asyncStates from '@zooniverse/async-states'
import { projects } from '@zooniverse/panoptes-js'
import sinon from 'sinon'
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

    it('should have a `background` property', function () {
      expect(projectStore.background).to.be.an('object')
    })

    it('should have a `displayName` property', function () {
      expect(projectStore.displayName).to.be.null()
    })

    it('should have a `description` property', function () {
      expect(projectStore.description).to.be.a('string')
    })

    it('should have an `error` property', function () {
      expect(projectStore.error).to.be.an('object')
    })

    it('should have an `experimental_tools` property', function () {
      expect(projectStore.experimental_tools).to.be.an('array')
    })

    it('should have an `id` property', function () {
      expect(projectStore.id).to.be.null()
    })

    it('should have an `launch_approved` property', function () {
      expect(projectStore.launch_approved).to.be.a('boolean')
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
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: mocks.responses.get.projectWithLinkedResources })
          })
        }
      }
    })

    afterEach(function () {
      clientStub.projects.getWithLinkedResources.resetHistory()
    })

    after(function () {
      rootStore = null
      projectStore = null
    })

    it('should exist', function () {
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project
      expect(projectStore.fetch).to.be.a('function')
    })

    it('should fetch a valid project resource', function (done) {
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project
      expect(projectStore.loadingState).to.equal(asyncStates.initialized)

      projectStore.fetch('foo/bar')
        .then(function () {
          const { projectBackground, projectTwo } = mocks.resources

          expect(projectStore.background).to.eql(projectBackground)
          expect(projectStore.displayName).to.equal(projectTwo.display_name)
          expect(projectStore.id).to.equal(projectTwo.id)
          expect(projectStore.launch_approved).to.equal(projectTwo.launch_approved)
          expect(projectStore.loadingState).to.equal(asyncStates.success)
          expect(projectStore.slug).to.equal(projectTwo.slug)
        })
        .then(done, done)

      // Since this is run before fetch's thenable resolves, it should test
      // correctly during the request.
      expect(projectStore.loadingState).to.equal(asyncStates.loading)
    })

    it('should set an error state if response is an empty array', function (done) {
      clientStub = {
        projects: {
          getWithLinkedResources: sinon.stub().callsFake(() => {
            return Promise.resolve({ body: { projects: [] }})
          })
        }
      }
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project

      projectStore.fetch('foo/bar')
        .then(() => {
          expect(projectStore.loadingState).to.equal(asyncStates.error)
          expect(projectStore.error.message).to.equal('foo/bar could not be found')
        })
        .then(done, done)
    })

    it('should request with params if defined', function (done) {
      rootStore = Store.create({}, { client: clientStub })
      projectStore = rootStore.project

      projectStore.fetch('foo/bar', { env: 'staging' })
        .then(() => {
          expect(rootStore.client.projects.getWithLinkedResources).to.be.calledOnceWith(
            { query: { slug: 'foo/bar', env: 'staging' } }
          )
        })
        .then(done, done)
    })
  })
})
