import { expect } from 'chai'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Store', function () {
  it('should export an object', function () {
    expect(Store).to.be.an('object')
  })

  it('should contain a project store', function () {
    const store = Store.create({}, placeholderEnv)
    expect(store.project).to.be.ok()
  })
})
