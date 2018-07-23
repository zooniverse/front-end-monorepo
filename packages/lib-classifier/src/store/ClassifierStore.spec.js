import ClassifierStore from './ClassifierStore'

let classifierStore

describe('Model > ClassifierStore', function () {
  before(function () {
    classifierStore = ClassifierStore.create()
  })

  it('should exist', function () {
    expect(ClassifierStore).to.not.equal(undefined)
  })

  it('should have a `layout` property', function () {
    expect(classifierStore.layout).to.deep.equal('default')
  })

  // This can't be tested properly yet as there is only one layout, and the
  // model uses an enumerable
  it('should have a `setLayout` method', function () {
    expect(classifierStore.setLayout).to.be.a('function')
  })
})
