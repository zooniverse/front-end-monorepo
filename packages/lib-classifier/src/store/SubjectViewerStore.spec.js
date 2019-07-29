import asyncStates from '@zooniverse/async-states'
import SubjectViewerStore from './SubjectViewerStore'

describe.only('Model > SubjectViewerStore', function () {
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
})
