import RootStore from './RootStore'

let model
const client = { foo: 'bar' }

describe('Model > RootStore', function () {
  before(function () {
    model = RootStore.create({}, { client })
  })

  it('should exist', function () {
    expect(RootStore).to.not.equal(undefined)
  })

  describe('stores', function () {
    const stores = [
      'classification',
      'classifier',
      'projects',
      'subjects',
      'tasks',
      'workflows'
    ]

    stores.forEach(function (store) {
      it(`should have a \`${store}\` store`, function () {
        expect(model[store]).to.not.equal(undefined)
      })
    })
  })

  it('should expose the client when passed in', function () {
    expect(model.client).to.equal(client)
  })
})
