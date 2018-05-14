import Project, { defaultProjectState } from './Project'

describe.only('Stores > Project', function () {
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
