import { types } from 'mobx-state-tree'
import SubjectGroupTask from '@plugins/tasks/SubjectGroupTask'

const subjectGroupTask = {
  question: 'Which of these cells look weird?',
  required: false,
  taskKey: 'T2',
  type: 'subjectGroup'
}

describe('Model > SubjectGroupTask', function () {
  it('should exist', function () {
    const subjectGroupTaskInstance = SubjectGroupTask.TaskModel.create(subjectGroupTask)
    expect(subjectGroupTaskInstance).to.be.ok()
    expect(subjectGroupTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      SubjectGroupTask.TaskModel.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let task

    before(function () {
      task = SubjectGroupTask.TaskModel.create(subjectGroupTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: SubjectGroupTask.AnnotationModel,
        task: SubjectGroupTask.TaskModel
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
      task.updateAnnotation([1])
      expect(task.annotation.value).to.deep.equal([1])
    })
  })

  describe('when required', function () {
    let task

    before(function () {
      const requiredTask = Object.assign({}, subjectGroupTask, { required: true })
      task = SubjectGroupTask.TaskModel.create(requiredTask)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: SubjectGroupTask.AnnotationModel,
        task: SubjectGroupTask.TaskModel
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
        task.updateAnnotation([1])
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
