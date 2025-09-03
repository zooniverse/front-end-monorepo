import { getType } from 'mobx-state-tree'
import Task from './Task'
import Annotation from './Annotation'

describe('Model > Task', function () {
  const mockTask = {
    taskKey: 'T0',
    type: 'default'
  }

  it('should exist', function () {
    const taskInstance = Task.create({ taskKey: 'T3', type: 'default' })
    expect(taskInstance).to.exist
    expect(taskInstance).to.be.an('object')
  })

  it('should error for invalid tasks', function () {
    let errorThrown = false
    try {
      Task.create({})
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })

  it('should have a validation function', function () {
    const taskInstance = Task.create({ taskKey: 'T3', type: 'default' })
    expect(taskInstance.validate).to.be.a('function')
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = Task.create(mockTask)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.exist
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('default')
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
      task = Task.create(mockTask)
      annotation = task.createAnnotation()
    })

    it('should start up with an undefined value', function () {
      expect(task.annotation).to.equal(undefined)
    })

    it('should always be complete', function () {
      expect(task.isComplete(annotation)).to.equal(true)
    })

    it('should create new Annotation models', function () {
      expect(getType(annotation)).to.equal(Annotation)
    })

    it('should add its task key to annotations', function () {
      expect(annotation.task).to.equal(task.taskKey)
    })

    it('should always be valid', function () {
      expect(task.isValid).to.equal(true)
    })
  })
})
