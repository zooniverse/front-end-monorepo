import SimpleDropdownAnnotation from './SimpleDropdownAnnotation'

describe('Model > SimpleDropdownAnnotation', function () {
  describe('with a selected answer', function () {
    let simpleDropdownAnnotation

    before(function () {
      simpleDropdownAnnotation = SimpleDropdownAnnotation.create({
        id: 'dropdown-simple-1',
        task: 'T0',
        taskType: 'dropdown-simple',
        value: {
           selection: 2,
           option: true
        }
      })
    })

    it('should exist', function () {
      expect(simpleDropdownAnnotation).to.be.ok()
      expect(simpleDropdownAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(simpleDropdownAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let simpleDropdownAnnotation

    before(function () {
      simpleDropdownAnnotation = SimpleDropdownAnnotation.create({
        id: 'dropdown-simple-1',
        task: 'T0',
        taskType: 'dropdown-simple'
      })
    })

    it('should exist', function () {
      expect(simpleDropdownAnnotation).to.be.ok()
      expect(simpleDropdownAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(simpleDropdownAnnotation.isComplete).to.be.false()
    })
  })
})
