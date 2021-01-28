import { types } from 'mobx-state-tree'
import SubjectGroupComparisonTask from '@plugins/tasks/SubjectGroupComparisonTask'

const subjectGroupTask = {
  question: 'Which of these cells look weird?',
  required: false,
  taskKey: 'T2',
  type: 'subjectGroupComparison'
}

describe('Model > SubjectGroupComparisonTask', function () {
  it('should exist', function () {
    const subjectGroupTaskInstance = SubjectGroupComparisonTask.TaskModel.create(subjectGroupTask)
    expect(subjectGroupTaskInstance).to.be.ok()
    expect(subjectGroupTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      SubjectGroupComparisonTask.TaskModel.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let task, annotation

    before(function () {
      task = SubjectGroupComparisonTask.TaskModel.create(subjectGroupTask)
      annotation = task.defaultAnnotation()
      const store = types.model('MockStore', {
        annotation: SubjectGroupComparisonTask.AnnotationModel,
        task: SubjectGroupComparisonTask.TaskModel
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
      const markedCell = { index: 1, subject: 'subject1111' }
      annotation.update([ markedCell ])
      expect(task.annotation.value[0]).to.deep.equal(markedCell)
    })
  })

  describe('when required', function () {
    let task, annotation

    before(function () {
      const requiredTask = Object.assign({}, subjectGroupTask, { required: true })
      task = SubjectGroupComparisonTask.TaskModel.create(requiredTask)
      annotation = task.defaultAnnotation()
      const store = types.model('MockStore', {
        annotation: SubjectGroupComparisonTask.AnnotationModel,
        task: SubjectGroupComparisonTask.TaskModel
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
        const markedCell = { index: 1, subject: 'subject1111' }
        annotation.update([ markedCell ])
        expect(task.isComplete).to.be.true()
      })
    })
  })
})
