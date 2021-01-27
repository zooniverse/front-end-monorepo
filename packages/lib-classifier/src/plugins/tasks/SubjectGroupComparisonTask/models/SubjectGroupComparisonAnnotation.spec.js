import SubjectGroupComparisonAnnotation from './SubjectGroupComparisonAnnotation'

describe('Model > SubjectGroupComparisonAnnotation', function () {
  describe('with a selected answer', function () {
    let subjectGroupAnnotation

    before(function () {
      subjectGroupAnnotation = SubjectGroupComparisonAnnotation.create({
        id: 'subjectGroupAnnotation-0',
        task: 'T0',
        taskType: 'subjectGroupComparison',
        value: [
          { index: 0, subject: 'subject-1110' },
          { index: 5, subject: 'subject-1115' },
        ]
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
      subjectGroupAnnotation = SubjectGroupComparisonAnnotation.create({
        id: 'subjectGroupAnnotation-0',
        task: 'T0',
        taskType: 'subjectGroupComparison'
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
