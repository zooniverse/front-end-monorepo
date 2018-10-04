import SubjectViewerStore from './SubjectViewerStore'

let subjectViewerStore

describe('Model > SubjectViewerStore', function () {
  before(function () {
    subjectViewerStore = SubjectViewerStore.create()
  })

  it('should exist', function () {
    expect(SubjectViewerStore).to.not.equal(undefined)
  })

  it('should have a `layout` property', function () {
    expect(subjectViewerStore.layout).to.deep.equal('default')
  })

  // This can't be tested properly yet as there is only one layout, and the
  // model uses an enumerable
  it('should have a `setLayout` method', function () {
    expect(subjectViewerStore.setLayout).to.be.a('function')
  })
})
