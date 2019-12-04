import SingleChoiceAnnotation from './SingleChoiceAnnotation'

describe('Model > SingleChoiceAnnotation', function () {
  describe('with a selected answer', function () {
    let singleChoiceAnnotation

    before(function () {
      singleChoiceAnnotation = SingleChoiceAnnotation.create({ task: 'T0', value: 0 })
    })

    it('should exist', function () {
      expect(singleChoiceAnnotation).to.be.ok()
      expect(singleChoiceAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(singleChoiceAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let singleChoiceAnnotation

    before(function () {
      singleChoiceAnnotation = SingleChoiceAnnotation.create({ task: 'T0' })
    })

    it('should exist', function () {
      expect(singleChoiceAnnotation).to.be.ok()
      expect(singleChoiceAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(singleChoiceAnnotation.isComplete).to.be.false()
    })
  })
})
