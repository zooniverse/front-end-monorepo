import DropdownAnnotation from './DropdownAnnotation'

describe('Model > DropdownAnnotation', function () {
  describe('with a selected answer', function () {
    let dropdownAnnotation

    before(function () {
      dropdownAnnotation = DropdownAnnotation.create({
        id: 'dropdown1',
        task: 'T0',
        taskType: 'dropdown',
        value: [
          {
             "value": 'dropdown-option-A',
             "option": true
          }
        ]
      })
    })

    it('should exist', function () {
      expect(dropdownAnnotation).to.be.ok()
      expect(dropdownAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(dropdownAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let dropdownAnnotation

    before(function () {
      dropdownAnnotation = DropdownAnnotation.create({
        id: 'dropdown1',
        task: 'T0',
        taskType: 'dropdown'
      })
    })

    it('should exist', function () {
      expect(dropdownAnnotation).to.be.ok()
      expect(dropdownAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(dropdownAnnotation.isComplete).to.be.false()
    })
  })
})
