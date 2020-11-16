import TextAnnotation from './TextAnnotation'

describe('Model > TextAnnotation', function () {
  describe('with an answer', function () {
    let textAnnotation

    before(function () {
      textAnnotation = TextAnnotation.create({ id: 'text1', task: 'T4', taskType: 'text', value: 'test' })
    })

    it('should exist', function () {
      expect(textAnnotation).to.be.ok()
      expect(textAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(textAnnotation.isComplete).to.be.true()
    })

    it('should error for invalid annotations', function () {
      let errorThrown = false
      try {
        TextAnnotation.create({ id: 'text1', task: 'T4', taskType: 'text', value: 5 })
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })

  describe('without an answer', function () {
    let textAnnotation

    before(function () {
      textAnnotation = TextAnnotation.create({ id: 'text1', task: 'T4', taskType: 'text' })
    })

    it('should exist', function () {
      expect(textAnnotation).to.be.ok()
      expect(textAnnotation).to.be.an('object')
    })

    it('should have a default value', function () {
      expect(textAnnotation.value).to.equal('')
    })

    it('should be incomplete', function () {
      expect(textAnnotation.isComplete).to.be.false()
    })
  })
})
