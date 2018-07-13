import ClassificationStore from './ClassificationStore'

let classificationStore

describe('Model > ClassificationStore', function () {
  before(function () {
    classificationStore = ClassificationStore.create()
  })

  it('should exist', function () {
    expect(ClassificationStore).to.not.equal(undefined)
  })

  it('should have an `active` property', function () {
    expect(classificationStore.taskId).to.not.equal('undefined')
  })

  it('should have an `annotations` property', function () {
    expect(classificationStore.annotations).to.not.equal('undefined')
  })

  it('should create an new annotation when the active task changes', function () {

  })
})
