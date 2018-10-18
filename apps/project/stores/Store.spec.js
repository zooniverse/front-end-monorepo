import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Store', function () {
  it('should export an object', function () {
    Store.should.be.an('object')
  })

  it('should contain a project store', function () {
    const store = Store.create({}, placeholderEnv)
    store.project.should.exist
  })
})
