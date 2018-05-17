import Project, { defaultProjectState } from './Project'
import nock from 'nock'

// Required until we swap out axios for the panoptesjs transport lib
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
axios.defaults.adapter = httpAdapter;

describe('Stores > Project', function () {
  it('should export an object', function () {
    Project.should.be.an('object')
  })

  describe('model', function () {
    describe('data property', function () {
      it('should exist', function () {
        const store = Project.create(defaultProjectState)
        store.data.should.be.an('object')
      })
    })

    describe('isLoading property', function () {
      it('should exist', function () {
        const store = Project.create(defaultProjectState)
        store.isLoading.should.be.a('boolean')
      })
    })
  })

  describe('actions', function () {
    describe('fetch', function () {
      it('should exist', function () {
        const store = Project.create(defaultProjectState)
        store.fetch.should.be.a('function')
      })

      it('should correctly request a project when passed a slug', function (done) {
        const data = {
          projects: [{
            baz: 'beep'
          }]
        }

        // Here we introduce a delay before the response ends. This allows us
        // to test whether the store.isLoading property is updating correctly.
        nock('https://www.zooniverse.org')
          .get('/api/projects')
          .query({ slug: 'foo/bar' })
          .delayBody(500)
          .reply(200, data);

        const store = Project.create(defaultProjectState)

        store.fetch('foo/bar')
          .then(function () {
            store.data.should.deep.equal(data.projects[0])
            store.isLoading.should.equal(false)
            done()
          })

        // Since this is run before fetch's thenable resolves, it should test
        // correctly during the request.
        store.isLoading.should.equal(true)
      })
    })
  })

  describe('defaultProjectState', function () {
    it('should exist', function () {
      defaultProjectState.should.be.an('object')
    })

    it('should provide an isLoading value', function () {
      defaultProjectState.isLoading.should.equal(false)
    })
  })
})
