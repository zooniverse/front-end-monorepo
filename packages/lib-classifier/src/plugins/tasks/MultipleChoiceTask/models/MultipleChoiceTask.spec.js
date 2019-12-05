import ClassificationStore from '@store/ClassificationStore'
import MultipleChoiceTask from './MultipleChoiceTask'

const multipleChoiceTask = {
  answers: [
    { label: 'leaves', _key: Math.random() },
    { label: 'flowers', _key: Math.random() }
  ],
  question: 'What do you see?',
  required: false,
  taskKey: 'T2',
  type: 'multiple'
}

describe('Model > MultipleChoiceTask', function () {
  it('should exist', function () {
    const multipleChoiceTaskInstance = MultipleChoiceTask.create(multipleChoiceTask)
    expect(multipleChoiceTaskInstance).to.be.ok()
    expect(multipleChoiceTaskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      const task = MultipleChoiceTask.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with a classification', function () {
    let task

    before(function () {
      task = MultipleChoiceTask.create(multipleChoiceTask)
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
      const requiredTask = Object.assign({}, multipleChoiceTask, { required: true })
      task = MultipleChoiceTask.create(requiredTask)
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
