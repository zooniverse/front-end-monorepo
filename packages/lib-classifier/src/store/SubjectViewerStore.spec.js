import asyncStates from '@zooniverse/async-states'
import SubjectViewerStore from './SubjectViewerStore'

describe('Model > SubjectViewerStore', function () {
  it('should exist', function () {
    expect(SubjectViewerStore).to.be.ok()
    expect(SubjectViewerStore).to.be.an('object')
  })

  describe('layout', function () {
    let subjectViewerStore
    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
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

  describe('Actions > enableRotation', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should enable subject rotation', function () {
      expect(subjectViewerStore.rotationEnabled).to.be.false()
      subjectViewerStore.enableRotation()
      expect(subjectViewerStore.rotationEnabled).to.be.true()
    })
  })

  describe('Actions > rotate', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should rotate the subject by -90 degrees', function () {
      expect(subjectViewerStore.rotation).to.equal(0)
      subjectViewerStore.rotate()
      expect(subjectViewerStore.rotation).to.equal(-90)
      subjectViewerStore.resetView()
    })
  })

  describe('Actions > resetSubject', function () {
    let subjectViewerStub
    let subjectViewerStore
    before(function () {
      subjectViewerStub = {
        loadingState: asyncStates.success,
        dimensions: [
          { clientHeight: 200, clientWidth: 200, naturalHeight: 200, naturalWidth: 200 }
        ]
      }
      subjectViewerStore = SubjectViewerStore.create(subjectViewerStub)
    })

    it('should reset the loading state and subject dimensions when there is a new active subject', function () {
      expect(subjectViewerStore.loadingState).to.equal(subjectViewerStub.loadingState)
      expect(subjectViewerStore.dimensions).to.deep.equal(subjectViewerStub.dimensions)
      subjectViewerStore.resetSubject()
      expect(subjectViewerStore.loadingState).to.equal(asyncStates.loading)
      expect(subjectViewerStore.dimensions).to.have.lengthOf(0)
    })
  })

  describe('Actions > resetView', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should reset subject rotation', function () {
      subjectViewerStore.rotate()
      subjectViewerStore.resetView()
      expect(subjectViewerStore.rotation).to.equal(0)
    })
  })
})
