import { types } from 'mobx-state-tree'
import MultipleChoiceTask from '@plugins/tasks/MultipleChoiceTask'

const multipleChoiceTask = {
  answers: [
    { label: 'leaves', _key: Math.random() },
    { label: 'flowers', _key: Math.random() }
  ],
  question: 'What do you see?',
  required: '',
  taskKey: 'T2',
  type: 'multiple'
}

describe('Model > MultipleChoiceTask', function () {
  it('should exist', function () {
    const multipleChoiceTaskInstance = MultipleChoiceTask.TaskModel.create(multipleChoiceTask)
    expect(multipleChoiceTaskInstance).to.be.ok()
    expect(multipleChoiceTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      MultipleChoiceTask.TaskModel.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = MultipleChoiceTask.TaskModel.create(multipleChoiceTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T2')
      expect(annotation.taskType).to.equal('multiple')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation
      const secondAnnotation = task.defaultAnnotation
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = MultipleChoiceTask.TaskModel.create(multipleChoiceTask)
      annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: MultipleChoiceTask.AnnotationModel,
        task: MultipleChoiceTask.TaskModel
      })
      .create({
        annotation,
        task
      })
      task.setAnnotation(annotation)
    })

    it('should start up with an empty value', function () {
      expect(task.annotation.value).to.be.empty()
    })

    it('should update annotations', function () {
      annotation.update([1])
      expect(task.annotation.value).to.deep.equal([1])
    })
  })

  describe('when required', function () {
    let annotation
    let task

    before(function () {
      const requiredTask = Object.assign({}, multipleChoiceTask, { required: 'true' })
      task = MultipleChoiceTask.TaskModel.create(requiredTask)
      annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: MultipleChoiceTask.AnnotationModel,
        task: MultipleChoiceTask.TaskModel
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
        annotation.update([1])
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
