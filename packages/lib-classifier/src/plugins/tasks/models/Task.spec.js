import { getType } from 'mobx-state-tree'
import ClassificationStore from '@store/ClassificationStore'
import Task from './Task'
import Annotation from './Annotation'

describe('Model > Task', function () {
  const mockTask = {
    taskKey: 'T0'
  }

  it('should exist', function () {
    const taskInstance = Task.create({ taskKey: 'T3' })
    expect(taskInstance).to.be.ok()
    expect(taskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      const task = Task.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with a classification', function () {
    let task

    before(function () {
      task = Task.create(mockTask)
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

    it('should start up with an undefined value', function () {
      expect(task.annotation.value).to.be.undefined()
    })
    
    it('should always be complete', function () {
      expect(task.isComplete).to.be.true()
    })

    it('should create new Annotation models', function () {
      const annotation = task.createAnnotation()
      expect(getType(annotation)).to.equal(Annotation)
    })

    it('should add its task key to annotations', function () {
      expect(task.annotation.task).to.equal(task.taskKey)
    })
  })
})
