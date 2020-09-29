import { types } from 'mobx-state-tree'
import DropdownTask from '@plugins/tasks/DropdownTask'

const dropdownTask = {
  instruction: 'Choose your favourite things.',
  selects: [{
    allowCreate: false,
    id: 'dropdown-select-1',
    options: {
      '*': [
        {
          label: 'Red',
          value: 'hashed-value-R',
        },
        {
          label: 'Green',
          value: 'hashed-value-G',
        },
        {
          label: 'Blue',
          value: 'hashed-value-B',
        },
      ],
    },
    required: false,
    title: 'Colour',
  }],
  required: false,
  taskKey: 'T1',
  type: 'dropdown'
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

    it('should start with 0 annotations', function () {
      expect(task.annotation.value).to.have.lengthOf(0)
    })

    it('should update annotations', function () {
      task.updateAnnotation([
        {
          value: 'hashed-value-R',
          option: true,
        }
      ])
      const annotationValue = task.annotation.value && task.annotation.value[0]
      expect(annotationValue.value).to.equal('hashed-value-R')
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
        task.updateAnnotation([
          {
            value: 'hashed-value-R',
            option: true,
          }
        ])
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
