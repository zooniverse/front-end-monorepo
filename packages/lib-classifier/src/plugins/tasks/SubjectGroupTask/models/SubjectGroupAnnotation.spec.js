import SubjectGroupAnnotation from './SubjectGroupAnnotation'

describe('Model > SubjectGroupAnnotation', function () {
  describe('with a selected answer', function () {
    let SubjectGroupAnnotation

    before(function () {
      SubjectGroupAnnotation = SubjectGroupAnnotation.create({ id: 'subjectgroup1', task: 'T0', taskType: 'subjectGroup', value: [0, 3] })
    })

    it('should exist', function () {
      expect(SubjectGroupAnnotation).to.be.ok()
      expect(SubjectGroupAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(SubjectGroupAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let SubjectGroupAnnotation

    before(function () {
      SubjectGroupAnnotation = SubjectGroupAnnotation.create({ id: 'multiple1', task: 'T0', taskType: 'multiple' })
    })

    it('should exist', function () {
      expect(SubjectGroupAnnotation).to.be.ok()
      expect(SubjectGroupAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(SubjectGroupAnnotation.isComplete).to.be.false()
    })
  })
})
