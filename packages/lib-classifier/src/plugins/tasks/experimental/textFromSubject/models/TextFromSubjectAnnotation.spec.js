import TextFromSubjectAnnotation from './TextFromSubjectAnnotation'

describe('Model > TextFromSubjectAnnotation', function () {
  describe('with an answer', function () {
    let textFromSubjectAnnotation

    before(function () {
      textFromSubjectAnnotation = TextFromSubjectAnnotation.create({ id: 'text1', task: 'T4', taskType: 'textFromSubject', value: 'test' })
    })

    it('should exist', function () {
      expect(textFromSubjectAnnotation).to.be.ok()
      expect(textFromSubjectAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(textFromSubjectAnnotation.isComplete).to.be.true()
    })

    it('should error for invalid annotations', function () {
      let errorThrown = false
      try {
        TextFromSubjectAnnotation.create({ id: 'text1', task: 'T4', taskType: 'textFromSubject', value: 5 })
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })

  describe('without an answer', function () {
    let textFromSubjectAnnotation

    before(function () {
      textFromSubjectAnnotation = TextFromSubjectAnnotation.create({ id: 'text1', task: 'T4', taskType: 'textFromSubject' })
    })

    it('should exist', function () {
      expect(textFromSubjectAnnotation).to.be.ok()
      expect(textFromSubjectAnnotation).to.be.an('object')
    })

    it('should have a default value', function () {
      expect(textFromSubjectAnnotation.value).to.equal('')
    })

    it('should be incomplete', function () {
      expect(textFromSubjectAnnotation.isComplete).to.be.false()
    })
  })
})
