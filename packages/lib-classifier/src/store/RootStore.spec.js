import sinon from 'sinon'
import RootStore from './RootStore'

let model
const client = { foo: 'bar' }

describe('Model > RootStore', function () {
  before(function () {
    model = RootStore.create({}, { client })
  })

  it('should exist', function () {
    expect(RootStore).to.exist
  })

  const stores = [
    'classifications',
    'drawing',
    'projects',
    'subjects',
    'subjectViewer',
    'tutorials',
    'workflows',
    'workflowSteps'
  ]

  stores.forEach(function (store) {
    it(`should have a \`${store}\` property`, function () {
      expect(model[store]).to.exist
    })
  })

  it('should expose the client when passed in', function () {
    expect(model.client).to.equal(client)
  })

  it('should have an onToggleFavourite callback', function () {
    const onToggleFavourite = sinon.stub()
    model.setOnToggleFavourite(onToggleFavourite)
    expect(model.onToggleFavourite).to.equal(onToggleFavourite)
  })

  it('should have an onAddToCollection callback', function () {
    const addToCollection = sinon.stub()
    model.setOnAddToCollection(addToCollection)
    expect(model.onAddToCollection).to.equal(addToCollection)
  })
})
