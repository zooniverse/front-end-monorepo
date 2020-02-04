import { getType, types } from 'mobx-state-tree'
import AnnotationsStore from '@store/AnnotationsStore'
import Task from './Task'
import Annotation from './Annotation'

describe('Model > Task', function () {
  const mockTask = {
    taskKey: 'T0',
    type: 'default'
  }

  it('should exist', function () {
    const taskInstance = Task.create({ taskKey: 'T3', type: 'default' })
    expect(taskInstance).to.be.ok()
    expect(taskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      Task.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('with an annotation', function () {
    let task

    before(function () {
      task = Task.create(mockTask)
      const annotations = AnnotationsStore.create()
      const store = types.model('MockStore', {
        annotations: AnnotationsStore,
        task: Task
      })
      .create({
        annotations,
        task
      })
      annotations.addAnnotation(task)
      task.setAnnotation(annotations.annotation(task))
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
