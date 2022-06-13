import { types } from 'mobx-state-tree'
import SimpleDropdownTask from '@plugins/tasks/dropdown-simple'
import { MIN_OPTIONS, MAX_OPTIONS } from './SimpleDropdownTask'

describe('Model > SimpleDropdownTask', function () {
  const { TaskModel, AnnotationModel } = SimpleDropdownTask
  const simpleDropdownTask = {
    allowCreate: false,
    options: [
      'Red',
      'Blue',
      'Yellow',
      'Green',
      'White',
      'Black',
    ],
    required: false,
    strings: {
      instruction: 'Choose your favourite colour'
    },
    taskKey: 'T1',
    type: 'dropdown-simple'
  }

  it('should exist', function () {
    const simpleDropdownTaskInstance = TaskModel.create(simpleDropdownTask)
    expect(simpleDropdownTaskInstance).to.be.ok()
    expect(simpleDropdownTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      SimpleDropdownTask.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = TaskModel.create(simpleDropdownTask)
      annotation = task.defaultAnnotation()
    })

    it('should start up with a null value', function () {
      expect(annotation.value).to.be.null()
    })

    it('should update annotations', function () {
      annotation.update({
        selection: 5,  // Corresponds to "Black"
        option: true,
      })
      const annotationValue = annotation.value
      expect(annotationValue.selection).to.equal(5)
    })
  })

  describe('when required', function () {
    let annotation
    let task

    before(function () {
      const requiredTask = Object.assign({}, simpleDropdownTask, { required: true })
      task = TaskModel.create(requiredTask)
      annotation = task.defaultAnnotation()
    })

    describe('with an incomplete annotation', function () {
      it('should be incomplete', function () {
        expect(task.isComplete(annotation)).to.be.false()
      })
    })

    describe('with a complete annotation', function () {
      it('should be complete', function () {
        annotation.update({
          selection: 5,
          option: true,
        })
        expect(task.isComplete(annotation)).to.be.true()
      })
    })
  })

  describe('with too few options', function () {
    let taskSnapshot

    before(function () {
      const options = []
      for (let i = 0; i < MIN_OPTIONS - 1 ; i++) {
        options.push(i.toString())
      }
      taskSnapshot = {
        instruction: 'Choose your favourite number',
        allowCreate: false,
        options,
        required: false,
        taskKey: 'T1',
        type: 'dropdown-simple'
      }
    })

    it('should throw an error', function () {
      let errorThrown = false
      try {
        TaskModel.create(taskSnapshot)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })

  describe('with too many options', function () {
    let taskSnapshot

    before(function () {
      const options = []
      for (let i = 0; i < MAX_OPTIONS + 1; i++) {
        options.push(i.toString())
      }
      taskSnapshot = {
        instruction: 'Choose your favourite number',
        allowCreate: false,
        options,
        required: false,
        taskKey: 'T1',
        type: 'dropdown-simple'
      }
    })

    it('should throw an error', function () {
      let errorThrown = false
      try {
        TaskModel.create(taskSnapshot)
      } catch (e) {
        errorThrown = true
      }
      expect(errorThrown).to.be.true()
    })
  })
})
