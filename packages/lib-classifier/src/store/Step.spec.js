import { types } from 'mobx-state-tree'
import Step from './Step'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'
import taskRegistry from '@plugins/tasks'

describe('Model > Step', function () {
  let step
  const SingleChoiceTask = taskRegistry.get('single')
  const MultipleChoiceTask = taskRegistry.get('multiple')

  before(function () {
    step = Step.create({ stepKey: 'S1', taskKeys: ['T1'] })
  })

  it('should exist', function () {
    expect(step).to.be.ok()
    expect(step).to.be.an('object')
  })

  describe('with incomplete, optional tasks', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
    })

    it('should be complete', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isComplete).to.be.true()
    })
  })

  describe('with any incomplete, required tasks', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: 'true' }))
      ]
    })

    it('should be incomplete', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isComplete).to.be.false()
    })
  })

  describe('with only required tasks', function () {
    let step
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: 'true' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: 'true' }))
      ]
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      const multipleChoiceAnnotation = tasks[0].defaultAnnotation
      const singleChoiceAnnotation = tasks[1].defaultAnnotation
      const store = types.model({
        annotations: types.array(types.union(MultipleChoiceTask.AnnotationModel, SingleChoiceTask.AnnotationModel)),
        step: Step
      })
      .create({
        annotations: [
          multipleChoiceAnnotation,
          singleChoiceAnnotation
        ],
        step
      })
      tasks[0].setAnnotation(multipleChoiceAnnotation)
      tasks[1].setAnnotation(singleChoiceAnnotation)
    })

    it('should be incomplete', function () {
      expect(step.isComplete).to.be.false()
    })

    describe('after annotating task T1', function () {
      it('should still be incomplete', function () {
        tasks[0].updateAnnotation([1])
        expect(step.isComplete).to.be.false()
      })

      it('should have one complete task', function () {
        expect(tasks[0].isComplete).to.be.true()
        expect(tasks[1].isComplete).to.be.false()
      })
    })

    describe('after annotating tasks T1 & T2', function () {
      it('should be complete', function () {
        tasks[1].updateAnnotation(1)
        expect(step.isComplete).to.be.true()
      })

      it('should have two complete tasks', function () {
        expect(tasks[0].isComplete).to.be.true()
        expect(tasks[1].isComplete).to.be.true()
      })
    })
  })
})
