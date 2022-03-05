import { legacyDropdownAdapter } from './'

describe('SimpleDropdownTask > panoptesAdapter', function () {

  describe('with a simple dropdown task', function () {
    let originalTask

    before(function () {
      originalTask = {
        allowCreate: false,
        taskKey: 'T0',
        type: 'dropdown-simple',
        help: 'This is some task help',
        instruction: 'This is the task instruction',
        options: [ 'One', 'Two' ]
      }
    })

    it('should return the task unchanged', function () {
      expect(legacyDropdownAdapter(originalTask)).to.equal(originalTask)
    })
  })

  describe('with a single dropdown menu', function () {
    let originalTask

    before(function () {
      originalTask = {
        taskKey: 'T0',
        type: 'dropdown',
        help: 'This is some task help',
        instruction: 'This is the task instruction',
        selects: [
          {
            allowCreate: false,
            options: {
              '*': [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 }
              ]
            },
            title: 'Test dropdown'
          }
        ]
      }
    })

    it('should return a simple dropdown task', function () {
      expect(legacyDropdownAdapter(originalTask)).to.deep.equal({
        allowCreate: false,
        taskKey: 'T0',
        type: 'dropdown-simple',
        help: 'This is some task help',
        instruction: 'This is the task instruction',
        options: [ 'One', 'Two' ]
      })
    })
  })

  describe('with a complex dropdown task', function () {
    let originalTask

    before(function () {
      originalTask = {
        taskKey: 'T0',
        type: 'dropdown',
        help: 'This is some task help',
        instruction: 'This is the task instruction',
        selects: [
          {
            allowCreate: false,
            options: {
              '*': [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 }
              ]
            },
            title: 'Numbers'
          },
          {
            allowCreate: false,
            options: {
              '*': [
                { label: 'Red', value: 1 },
                { label: 'Blue', value: 2 }
              ]
            },
            title: 'Colours'
          }
        ]
      }
    })

    it('should return the original task', function () {
      expect(legacyDropdownAdapter(originalTask)).to.equal(originalTask)
    })
  })
})