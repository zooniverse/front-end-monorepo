import Project from './Project'
import Store from './Store'
import asyncStates from './asyncStates'
import stubPanoptesJs from '../test/stubPanoptesJs'
import projectFixture, { initialState } from '../test/fixtures/project'


let rootStore
let projectStore

describe.only('Stores > Project', function () {
  it('should exist', function () {
    rootStore = Store.create()
    projectStore = rootStore.project
    projectStore.should.not.be.undefined
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create()
      projectStore = rootStore.project
    })

    it('should have a displayName property', function () {
      projectStore.displayName.should.equal('')
    })

    it('should have an error property', function () {
      expect(projectStore.error).to.equal(null)
    })

    it('should have an id property', function () {
      projectStore.id.should.equal('')
    })

    it('should have a state property', function () {
      projectStore.state.should.equal(asyncStates.initialized)
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })

  describe('fetch method', function () {
    before(function () {
      rootStore = Store.create({}, { client: stubPanoptesJs })
      projectStore = rootStore.project
    })

    it('should exist', function () {
      projectStore.fetch.should.be.a('function')
    })

    it('should fetch a valid project resource', function (done) {
      projectStore.fetch('foo/bar')
        .then(function () {
          projectStore.id.should.equal(projectFixture.body.projects[0].id)
          projectStore.state.should.equal(asyncStates.success)
          done()
        })

      // Since this is run before fetch's thenable resolves, it should test
      // correctly during the request.
      projectStore.state.should.equal(asyncStates.loading)
    })

    after(function () {
      rootStore = null
      projectStore = null
    })
  })

})
