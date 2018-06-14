import RootStore from './RootStore'

let model
const client = { foo: 'bar' }

describe('Model > RootStore', function () {
  before(function () {
    model = RootStore.create({}, { client })
  })

  after(function () {
    model = null
  })

  it('should exist', function () {
    expect(RootStore).to.not.be.undefined
  })

  describe('properties', function () {
    it('should have a `projects` property', function () {
      expect(model.projects).to.not.be.undefined
    })

    it('should have a `subjects` property', function () {
      expect(model.subjects).to.not.be.undefined
    })

    it('should have a `workflows` property', function () {
      expect(model.workflows).to.not.be.undefined
    })
  })

  it('should expose the client when passed in', function () {
    expect(model.client).to.equal(client)
  })
})
