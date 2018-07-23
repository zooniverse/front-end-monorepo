import sinon from 'sinon'
import { getEnv, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'

let rootStore
let resourceStore

const RootStub = types
  .model('RootStore', {
    resources: ResourceStore
  })
  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

const resourcesStub = {
  type: 'foobar',
  resources: {
    '123': { id: '123' },
    '456': { id: '456' }
  },
  active: '123'
}

const otherResourceStub = {
  id: '789'
}

const clientStub = {
  panoptes: {
    get () {
      return Promise.resolve({
        body: {
          foobar: [otherResourceStub]
        }
      })
    }
  }
}
sinon.spy(clientStub.panoptes, 'get')

describe('Model > ResourceStore', function () {
  before(function () {
    resourceStore = ResourceStore.create(resourcesStub)
    rootStore = RootStub.create({ resources: resourceStore }, { client: clientStub })
  })

  it('should have a required `type` property corresponding to the resource type', function () {
    expect(resourceStore.type).to.equal(resourcesStub.type)
    expect(function () { ResourceStore.create() }).to.throw()
  })

  it('should have a `resources` map to store any resource objects', function () {
    expect(resourceStore.resources).to.not.equal(undefined)
    expect(resourceStore.resources.size).to.equal(2)
    expect(resourceStore.resources.get('123')).to.deep.equal(resourcesStub.resources['123'])
  })

  it('should have an `active` property pointing to the active resource', function () {
    expect(resourceStore.active).to.deep.equal(resourcesStub.resources['123'])
  })

  it('should have a `reset` method to clear the store', function () {
    const resetStore = ResourceStore.create(resourcesStub)
    resetStore.reset()
    expect(resetStore.resources.size).to.equal(0)
    expect(resetStore.active).to.equal(null)
  })

  it('should use an existing resources object when `setActive` is called', async function () {
    await resourceStore.setActive('456')
    expect(resourceStore.active).to.deep.equal(resourcesStub.resources['456'])
    expect(clientStub.panoptes.get.notCalled).to.be.true
  })

  it('should fetch a missing resource object when `setActive` is called', async function () {
    await resourceStore.setActive('789')
    expect(resourceStore.active).to.deep.equal(otherResourceStub)
    expect(clientStub.panoptes.get.called).to.be.true
  })
})
