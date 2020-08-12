import { types } from 'mobx-state-tree'
import DropdownTask from '@plugins/tasks/DropdownTask'

const dropdownTask = {
  answers: [
    { label: 'yes', next: 'S2' },
    { label: 'no', next: 'S3' }
  ],
  question: 'Do you exist?',
  required: false,
  taskKey: 'T1',
  type: 'single'
}

describe('Model > DropdownTask', function () {
  it('should exist', function () {
    const dropdownTaskInstance = DropdownTask.TaskModel.create(dropdownTask)
    expect(dropdownTaskInstance).to.be.ok()
    expect(dropdownTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      DropdownTask.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let task

    before(function () {
      task = DropdownTask.TaskModel.create(dropdownTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: DropdownTask.AnnotationModel,
        task: DropdownTask.TaskModel
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
      task.updateAnnotation(1)
      expect(task.annotation.value).to.equal(1)
    })
  })

  describe('when required', function () {
    let task

    before(function () {
      const requiredTask = Object.assign({}, dropdownTask, { required: true })
      task = DropdownTask.TaskModel.create(requiredTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: DropdownTask.AnnotationModel,
        task: DropdownTask.TaskModel
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
        task.updateAnnotation(1)
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
