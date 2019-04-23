import { expect } from 'chai'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Store', function () {
  it('should export an object', function () {
    expect(Store).to.be.an('object')
  })

  it('should contain a publications store', function () {
    const store = Store.create({}, placeholderEnv)
    expect(store.publications).to.be.ok()
  })

  it('should contain a team store', function () {
    const store = Store.create({}, placeholderEnv)
    expect(store.team).to.be.ok()
  })

  it('should contain a ui store', function () {
    const store = Store.create({}, placeholderEnv)
    expect(store.ui).to.be.ok()
  })

  it('should contain a user store', function () {
    const store = Store.create({}, placeholderEnv)
    expect(store.user).to.be.ok()
  })
})
