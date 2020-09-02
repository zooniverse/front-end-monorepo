import sinon from 'sinon'
import AnnotationsStore from './AnnotationsStore'
import ClassificationStore from './ClassificationStore'
import Tool from '@plugins/drawingTools/models/tools/Tool'
import Task from '@plugins/tasks/models/Task'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask/models/SingleChoiceTask'
import {
  ClassificationFactory,
  SingleChoiceTaskFactory,
  SingleChoiceAnnotationFactory
} from '@test/factories'
import { applySnapshot } from 'mobx-state-tree'

describe('Model > AnnotationsStore', function () {
  let model
  before(function () {
    model = AnnotationsStore.create({})
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have no annotations', function () {
    expect(model.annotations.size).to.equal(0)
  })

  describe('updating an annotation', function () {
    const task = Task.create({ taskKey: 'T0', type: 'default', question: 'How many cats?' })

    before(function () {
      model = AnnotationsStore.create({})
    })

    describe('for a new task', function () {
      it('should create a new annotation', function () {
        model.addAnnotation(task)
        expect(model.annotations.size).to.equal(1)
      })

      it('should allow for 0 values', function () {
        const annotation = model.addAnnotation(task, 0)
        expect(annotation.value).to.equal(0)
      })

      it('should allow for null values', function () {
        const annotation = model.addAnnotation(task, null)
        expect(annotation.value).to.be.null
      })
    })

    describe('for an existing task', function () {
      it('should not create a new annotation', function () {
        const annotation = model.addAnnotation(task, 2)
        expect(model.annotations.size).to.equal(1)
        expect(annotation.value).to.equal(2)
      })
    })
  })

  describe('removing an annotation', function () {
    const task = Task.create({ taskKey: 'T0', type: 'default', question: 'How many cats?' })

    before(function () {
      model = AnnotationsStore.create({})
    })

    describe('for a new task', function () {
      it('should do nothing', function () {
        expect(model.annotations.size).to.equal(0)
        model.removeAnnotation('T0')
        expect(model.annotations.size).to.equal(0)
      })
    })

    describe('for an existing task', function () {
      it('should remove the existing annotation', function () {
        model.addAnnotation(task, 2)
        expect(model.annotations.size).to.equal(1)
        model.removeAnnotation('T0')
        expect(model.annotations.size).to.equal(0)
      })
    })
  })

  describe('reset observer', function () {
    it('should reset itself when the parent ClassificationStore node resets itself', function () {
      // Classification and AnnotationsStore are a composition whose parent is ClassificationStore
      const task = SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T0' }))
      const classificationSnapshot = ClassificationFactory.build()
      const classificationStore = ClassificationStore.create({})
      applySnapshot(classificationStore, {
        active: classificationSnapshot.id,
        resources: { [classificationSnapshot.id]: classificationSnapshot }
      })
      const resetSpy = sinon.spy(classificationStore.active, 'reset')

      expect(classificationStore.active.annotations.size).to.equal(0)
      classificationStore.addAnnotation(task, 2)
      expect(classificationStore.active.annotations.size).to.equal(1)
      classificationStore.reset()
      expect(resetSpy).to.have.been.calledOnce()
      expect(classificationStore.active).to.be.undefined()
      expect(classificationStore.resources).to.be.empty()
    })

    it('should reset itself when the parent Tool node resets itself', function () {
      const singleChoiceAnnotation = SingleChoiceAnnotationFactory.build()
      // Mark and AnnotationsStore are a composition whose parent is Tool
      const tool = Tool.create({
        color: '#ff0000',
        details: [
          {
            type: 'single',
            question: 'how many?',
            answers: ['one', 'two', 'three'],
            required: ''
          }
        ],
        label: 'Point',
        max: '10',
        min: 1,
        type: 'default'
      })
      tool.createMark({ id: '1', annotations: { [singleChoiceAnnotation.id]: singleChoiceAnnotation } })
      const mark = tool.marks.get('1')
      const resetSpy = sinon.spy(mark, 'reset')
      expect(mark.annotations.size).to.equal(1)
      tool.reset()
      expect(resetSpy).to.have.been.calledOnce()
      expect(tool.marks).to.be.empty()
    })
  })
})
