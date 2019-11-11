import ClassificationStore from '@store/ClassificationStore'
import SingleChoiceTask from './SingleChoiceTask'

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

describe('Model > SingleChoiceTask', function () {
  it('should exist', function () {
    const singleChoiceTaskInstance = SingleChoiceTask.create(singleChoiceTask)
    expect(singleChoiceTaskInstance).to.be.ok()
    expect(singleChoiceTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      const task = SingleChoiceTask.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with a classification', function () {
    let task

    before(function () {
      task = SingleChoiceTask.create(singleChoiceTask)
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

    it('should start up with a null value', function () {
      expect(task.annotation.value).to.be.null()
    })

    it('should update annotations', function () {
      task.updateAnnotation(1)
      expect(task.annotation.value).to.equal(1)
    })
  })
})
