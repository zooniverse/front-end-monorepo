import { types } from 'mobx-state-tree'
import TextTask from '@plugins/tasks/text'

describe('Model > TextTask', function () {
  const textTask = {
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion', '&'],
    type: 'text'
  }

  const singleChoiceTask = {
    answers: [
      { label: 'yes', next: 'S2' },
      { label: 'no', next: 'S3' }
    ],
    question: 'Do you exist?',
    required: '',
    taskKey: 'T1',
    type: 'single'
  }

  it('should exist', function () {
    const task = TextTask.TaskModel.create(textTask)
    expect(task).to.be.ok()
    expect(task).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      TextTask.TaskModel.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = TextTask.TaskModel.create(textTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('text')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('with an annotation', function () {
    let annotation
    let task

    before(function () {
      task = TextTask.TaskModel.create(textTask)
      annotation = task.defaultAnnotation()
    })

    it('should start up with an empty string', function () {
      expect(annotation.value).to.equal('')
    })

    it('should update annotations', function () {
      annotation.update('Hello there!')
      expect(annotation.value).to.equal('Hello there!')
    })
  })
})
