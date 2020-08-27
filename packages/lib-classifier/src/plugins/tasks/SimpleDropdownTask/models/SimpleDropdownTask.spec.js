import { types } from 'mobx-state-tree'
import SimpleDropdownTask from '@plugins/tasks/SimpleDropdownTask'

const simpleDropdownTask = {
  instruction: 'Choose your favourite colour',
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
  taskKey: 'T1',
  type: 'dropdown-simple'
}

describe.only('Model > SimpleDropdownTask', function () {
  it('should exist', function () {
    const simpleDropdownTaskInstance = SimpleDropdownTask.TaskModel.create(simpleDropdownTask)
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
    let task

    before(function () {
      task = SimpleDropdownTask.TaskModel.create(simpleDropdownTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: SimpleDropdownTask.AnnotationModel,
        task: SimpleDropdownTask.TaskModel
      })
      .create({
        annotation,
        task
      })
      task.setAnnotation(annotation)
    })

    it('should start up with a null value', function () {
      expect(task.annotation.value).to.be.null()
    })

    it('should update annotations', function () {
      task.updateAnnotation({
        value: 'Red',
        option: true,
      })
      const annotationValue = task.annotation.value
      expect(annotationValue.value).to.equal('Red')
    })
  })

  describe('when required', function () {
    let task

    before(function () {
      const requiredTask = Object.assign({}, simpleDropdownTask, { required: true })
      task = SimpleDropdownTask.TaskModel.create(requiredTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: SimpleDropdownTask.AnnotationModel,
        task: SimpleDropdownTask.TaskModel
      })
      .create({
        annotation,
        task
      })
      task.setAnnotation(annotation)
    })

    describe('with an incomplete annotation', function () {
      it('should be incomplete', function () {
        expect(task.isComplete).to.be.false()
      })
    })

    describe('with a complete annotation', function () {
      it('should be complete', function () {
        task.updateAnnotation({
          value: 'Red',
          option: true,
        })
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
