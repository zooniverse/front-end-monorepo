import { expect } from 'chai'
import Store from './Store'
import placeholderEnv from './helpers/placeholderEnv'

describe('Stores > Organization', function () {
  let organizationStore
  let rootStore

  it('should exist', function () {
    rootStore = Store.create({
      organization: {
        strings: {
          title: 'some text'
        }
      }
    }, placeholderEnv)
    organizationStore = rootStore.organization
    expect(organizationStore).to.be.ok()
  })

  describe('default model properties', function () {
    before(function () {
      rootStore = Store.create({
        organization: {
          strings: {
            title: 'some text'
          }
        }
      }, placeholderEnv)
      organizationStore = rootStore.organization
    })

    after(function () {
      rootStore = null
      organizationStore = null
    })

    it('should have an `id` property', function () {
      expect(organizationStore.id).to.be.null()
    })

    it('should have a `slug` property', function () {
      expect(organizationStore.slug).to.equal('')
    })

    it('should have a `title` property', function () {
      expect(organizationStore.title).to.be.a('string')
    })
  })
})
