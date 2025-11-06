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
      expect(subjectGroupAnnotation).to.exist
      expect(subjectGroupAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(subjectGroupAnnotation.isComplete).to.equal(true)
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
      expect(subjectGroupAnnotation).to.exist
      expect(subjectGroupAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(subjectGroupAnnotation.isComplete).to.equal(false)
    })
  })

  describe('Actions > addCell', function () {
    let annotation

    beforeEach(function () {
      annotation = SubjectGroupComparisonAnnotation.create({
        id: 'annotation-1',
        task: 'T0',
        taskType: 'subjectGroupComparison'
      })
    })

    it('should add a cell with index and subject', function () {
      annotation.addCell(3, 'subject-456')
      expect(annotation.value.length).to.equal(1)
      expect(annotation.value[0].index).to.equal(3)
      expect(annotation.value[0].subject).to.equal('subject-456')
      expect(annotation._inProgress).to.equal(true)
      expect(annotation.isComplete).to.equal(true)
    })

    it('should add multiple cells', function () {
      annotation.addCell(0, 'subject-111')
      annotation.addCell(1, 'subject-222')
      annotation.addCell(2, 'subject-333')
      expect(annotation.value.length).to.equal(3)
    })
  })

  describe('Actions > removeCell', function () {
    let annotation

    beforeEach(function () {
      annotation = SubjectGroupComparisonAnnotation.create({
        id: 'annotation-1',
        task: 'T0',
        taskType: 'subjectGroupComparison'
      })
      annotation.addCell(0, 'subject-111')
      annotation.addCell(1, 'subject-222')
      annotation.addCell(2, 'subject-333')
    })

    it('should remove the correct cell by index', function () {
      annotation.removeCell(0)
      expect(annotation.value.length).to.equal(2)
      expect(annotation.value[0].index).to.equal(1)
      expect(annotation.value[1].index).to.equal(2)
      expect(annotation._inProgress).to.equal(true)
    })

    it('should handle removing non-existent cells', function () {
      annotation.removeCell(99)
      expect(annotation.value.length).to.equal(3)
    })

    it('should make annotation incomplete when all cells removed', function () {
      annotation.removeCell(0)
      annotation.removeCell(1)
      annotation.removeCell(2)
      expect(annotation.isComplete).to.equal(false)
    })
  })

  describe('Views > getCellByIndex', function () {
    let annotation

    before(function () {
      annotation = SubjectGroupComparisonAnnotation.create({
        id: 'annotation-1',
        task: 'T0',
        taskType: 'subjectGroupComparison'
      })
      annotation.addCell(0, 'subject-111')
      annotation.addCell(5, 'subject-222')
      annotation.addCell(10, 'subject-333')
    })

    it('should find cell by index', function () {
      const cell = annotation.getCellByIndex(5)
      expect(cell.index).to.equal(5)
      expect(cell.subject).to.equal('subject-222')
    })

    it('should return undefined for non-existent index', function () {
      const cell = annotation.getCellByIndex(99)
      expect(cell).to.be.undefined
    })
  })

  describe('Views > toSnapshot', function () {
    it('should return array with cell data and no empty annotations', function () {
      const annotation = SubjectGroupComparisonAnnotation.create({
        id: 'annotation-1',
        task: 'T0',
        taskType: 'subjectGroupComparison'
      })
      annotation.addCell(0, 'subject-111')
      annotation.addCell(2, 'subject-222')

      const snapshot = annotation.toSnapshot()
      expect(snapshot).to.be.an('array')
      expect(snapshot).to.have.lengthOf(1)
      expect(snapshot[0].value[0]).to.deep.equal({ index: 0, subject: 'subject-111' })
      expect(snapshot[0].value[1]).to.deep.equal({ index: 2, subject: 'subject-222' })
    })
  })
})
