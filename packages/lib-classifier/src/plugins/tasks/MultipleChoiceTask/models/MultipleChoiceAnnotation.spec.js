import MultipleChoiceAnnotation from './MultipleChoiceAnnotation'

describe('Model > MutipleChoiceAnnotation', function () {
  describe('with a selected answer', function () {
    let multipleChoiceAnnotation

    before(function () {
      multipleChoiceAnnotation = MultipleChoiceAnnotation.create({ task: 'T0', value: [0, 3] })
    })

    it('should exist', function () {
      expect(multipleChoiceAnnotation).to.be.ok()
      expect(multipleChoiceAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(multipleChoiceAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let multipleChoiceAnnotation

    before(function () {
      multipleChoiceAnnotation = MultipleChoiceAnnotation.create({ task: 'T0' })
    })

    it('should exist', function () {
      expect(multipleChoiceAnnotation).to.be.ok()
      expect(multipleChoiceAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(multipleChoiceAnnotation.isComplete).to.be.false()
    })
  })
})
