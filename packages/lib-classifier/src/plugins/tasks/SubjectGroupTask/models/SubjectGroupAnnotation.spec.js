import SubjectGroupAnnotation from './SubjectGroupAnnotation'

describe('Model > SubjectGroupAnnotation', function () {
  describe('with a selected answer', function () {
    let subjectGroupAnnotation

    before(function () {
      subjectGroupAnnotation = SubjectGroupAnnotation.create({
        id: 'subjectGroupAnnotation-0',
        task: 'T0',
        taskType: 'subjectGroup',
        value: [0, 3]
      })
    })

    it('should exist', function () {
      expect(subjectGroupAnnotation).to.be.ok()
      expect(subjectGroupAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(subjectGroupAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let subjectGroupAnnotation

    before(function () {
      subjectGroupAnnotation = SubjectGroupAnnotation.create({
        id: 'subjectGroupAnnotation-0',
        task: 'T0',
        taskType: 'subjectGroup'
      })
    })

    it('should exist', function () {
      expect(subjectGroupAnnotation).to.be.ok()
      expect(subjectGroupAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(subjectGroupAnnotation.isComplete).to.be.false()
    })
  })
})
