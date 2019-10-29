import ClassificationStore from '@store/ClassificationStore'
import TextTask from './TextTask'

describe('Model > TextTask', function () {
  const textTask = {
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  }

  const singleChoiceTask = {
    answers: [
      { label: 'yes', next: 'S2' },
      { label: 'no', next: 'S3' }
    ],
    question: 'Do you exist?',
    required: false,
    taskKey: 'T1',
    type: 'single'
  }

  it('should exist', function () {
    const task = TextTask.create(textTask)
    expect(task).to.be.ok()
    expect(task).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      const task = TextTask.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with a classification', function () {
    let task

    before(function () {
      task = TextTask.create(textTask)
      task.classifications = ClassificationStore.create()
      const mockSubject = {
        id: 'subject',
        metadata: {}
      }
      const mockWorkflow = {
        id: 'workflow',
        version: '1.0'
      }
      const mockProject = {
        id: 'project'
      }
      task.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
    })

    it('should start up with an empty string', function () {
      expect(task.annotation.value).to.equal('')
    })

    it('should update annotations', function () {
      task.updateAnnotation('Hello there!')
      expect(task.annotation.value).to.equal('Hello there!')
    })
  })
})
