import { expect } from 'chai'
import { reducedEmptySubject, reducedSubject } from './mocks'

describe('Component > SubjectReductions', function () {
  describe('with reductions', function () {
    it('should exist', function () {
      expect(reducedSubject).to.be.ok()
    })

    it('should have points', function () {
      expect(reducedSubject.data.workflow.subject_reductions[0].data.points).to.be.a('array')
      expect(reducedSubject.data.workflow.subject_reductions[0].data.points).not.to.be.empty
    })
  })

  describe('without reductions', function () {
    it('should exist', function () {
      expect(reducedEmptySubject).to.be.ok()
    })

    it('should have points', function () {
      expect(reducedEmptySubject.data.workflow.subject_reductions[0].data.points).to.be.a('array')
      expect(reducedEmptySubject.data.workflow.subject_reductions[0].data.points).to.be.empty()
    })
  })
})
