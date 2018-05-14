import Store from './Store'

describe('Stores > Store', function () {
  it('should export an object', function () {
    Store.should.be.an('object')
  })

  it('should contain a project store', function () {
    const store = Store.create()
    store.project.should.exist
  })
})
