import { types } from 'mobx-state-tree'
import SingleChoiceTask from '@plugins/tasks/single'

describe('Model > SingleChoiceTask', function () {
  const singleChoiceTask = {
    answers: [
      { label: 'yes', next: 'S2' },
      { label: 'no', next: 'S3' }
    ],
    required: '',
    strings: {
      question: 'Do you exist?'
    },
    taskKey: 'T1',
    type: 'single'
  }

  it('should exist', function () {
    const singleChoiceTaskInstance = SingleChoiceTask.TaskModel.create(singleChoiceTask)
    expect(singleChoiceTaskInstance).to.be.ok()
    expect(singleChoiceTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      SingleChoiceTask.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = SingleChoiceTask.TaskModel.create(singleChoiceTask)
      annotation = task.defaultAnnotation()
    })

    it('should start up with a null value', function () {
      expect(annotation.value).to.be.null()
    })

    it('should update annotations', function () {
      annotation.update(1)
      expect(annotation.value).to.equal(1)
    })
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = SingleChoiceTask.TaskModel.create(singleChoiceTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T1')
      expect(annotation.taskType).to.equal('single')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('when required', function () {
    let annotation
    let task

    before(function () {
      const requiredTask = Object.assign({}, singleChoiceTask, { required: 'true' })
      task = SingleChoiceTask.TaskModel.create(requiredTask)
      annotation = task.defaultAnnotation()
    })

    describe('with an incomplete annotation', function () {
      it('should be incomplete', function () {
        expect(task.isComplete(annotation)).to.be.false()
      })
    })

    describe('with a complete annotation', function () {
      it('should be complete', function () {
        annotation.update(1)
        expect(task.isComplete(annotation)).to.be.true()
      })
    })
  })
})
