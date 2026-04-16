import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Organization', function () {
  let organizationsStore
  let rootStore

  it('should exist', function () {
    rootStore = Store.create({
      organizations: [{
        strings: {
          title: 'some text'
        }
      }]
    }, placeholderEnv)
    organizationsStore = rootStore.organizations
    expect(organizationsStore).toBeDefined()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({
        organizations: [{
          strings: {
            title: 'some text'
          }
        }]
      }, placeholderEnv)
      organizationsStore = rootStore.organizations
    })

    after(function () {
      rootStore = null
      organizationsStore = null
    })

    it('should have an `id` property', function () {
      expect(organizationsStore[0].id).to.equal(null)
    })

    it('should have a `slug` property', function () {
      expect(organizationsStore[0].slug).to.equal('')
    })

    it('should have a `title` property', function () {
      expect(organizationsStore[0].title).to.be.a('string')
    })
  })
})
