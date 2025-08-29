import { getSnapshot } from 'mobx-state-tree'
import Annotation from './Annotation'

describe('Model > Annotation', function () {
  let annotationInstance

  before(function () {
    annotationInstance = Annotation.create({ task: 'T4', taskType: 'default' })
  })

  it('should exist', function () {
    expect(annotationInstance).toBeDefined()
    expect(annotationInstance).to.be.an('object')
  })

  it('should have an id', function () {
    expect(annotationInstance.id).toBeDefined()
    expect(annotationInstance.id).to.be.a('string')
  })

  describe('snapshots', function () {
    let snapshot

    before(function () {
      snapshot = getSnapshot(annotationInstance)
    })

    it('should not have an ID', function () {
      expect(snapshot.id).to.equal(undefined)
    })
  })
})
