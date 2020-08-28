import { types } from 'mobx-state-tree'
import sinon from 'sinon'
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

  describe('with a next step', function () {
    it('should have isThereANextStep return true', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], next: 'S2' })
      expect(step.isThereANextStep).to.be.true()
    })
  })

  describe('without a next step', function () {
    it('should have isThereANextStep return false', function () {
      const step = Step.create({ stepKey: 'S2', taskKeys: ['T1', 'T2'], previous: 'S1' })
      expect(step.isThereANextStep).to.be.false()
    })
  })

  describe('with a previous step', function () {
    it('should have isThereAPreviousStep return true', function () {
      const step = Step.create({ stepKey: 'S2', taskKeys: ['T1', 'T2'], previous: 'S1' })
      expect(step.isThereAPreviousStep).to.be.true()
    })
  })

  describe('without a previous step', function () {
    it('should have isThereAPreviousStep return false', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], next: 'S2' })
      expect(step.isThereAPreviousStep).to.be.false()
    })
  })

  describe('with a single choice branching task, two unique next steps', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        // SingleChoiceTaskFactory defaults to a branching single choice task (answers with different next values)
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
    })

    it('should have isThereBranching return true', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.true()
    })
  })

  describe('with a single choice branching task, two unique next tasks (backwards compatible)', function () {
    let tasks
    before(function () {
      tasks = [
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T0',
          required: '',
          answers: [
            { label: 'Yes', next: 'T1' },
            { label: 'No' },
            { label: 'Maybe', next: 'T2' }
          ]
        })),
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
    })

    it('should have isThereBranching return true', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T0'], tasks })
      expect(step.isThereBranching).to.be.true()
    })
  })

  describe('with a single choice branching task, one next finishes', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Yes', next: 'S2' },
            { label: 'No' },
            { label: 'Maybe', next: 'S2' }
          ]
        }))
      ]
    })

    it('should have isThereBranching return true', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.true()
    })
  })

  describe('with a single choice branching task, one next finishes and two unique next steps', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Yes', next: 'S2' },
            { label: 'No' },
            { label: 'Maybe', next: 'S3' }
          ]
        }))
      ]
    })

    it('should have isThereBranching return true', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.true()
    })
  })

  describe('without a single choice branching task, defined next steps', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Red', next: 'S2' },
            { label: 'Blue', next: 'S2' }
          ]
        }))
      ]
    })

    it('should have isThereBranching return false', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.false()
    })
  })

  describe('without a single choice branching task, defined next tasks (backwards compatible)', function () {
    let tasks
    before(function () {
      tasks = [
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T0',
          required: '',
          answers: [
            { label: 'Red', next: 'T1' },
            { label: 'Blue', next: 'T1' }
          ]
        })),
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
    })

    it('should have isThereBranching return false', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.false()
    })
  })

  describe('without a single choice branching task, undefined nexts (finish)', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Red' },
            { label: 'Blue' }
          ]
        }))
      ]
    })

    it('should have isThereBranching return false', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      expect(step.isThereBranching).to.be.false()
    })
  })

  describe('with reset', function () {
    let tasks

    it('should reset each task', function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      const resetSpies = {}
      step.tasks.forEach(task => {
        resetSpies[task.taskKey] = sinon.spy(task, 'reset')
        expect(resetSpies[task.taskKey]).to.have.not.been.called()
      })
      step.reset()
      step.tasks.forEach(task => {
        expect(resetSpies[task.taskKey]).to.have.been.calledOnce()
      })
    })

    describe('and branching', function () {
      beforeEach(function () {
        tasks = [
          SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
            taskKey: 'T2'
          }))
        ]
      })

      it('should reset previous to undefined', function () {
        step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks, previous: 'S1' })
        expect(step.previous).to.equal('S1')
        step.reset()
        expect(step.previous).to.equal(undefined)
      })

      it('should reset next to undefined', function () {
        step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks, next: 'S3' })
        expect(step.next).to.equal('S3')
        step.reset()
        expect(step.next).to.equal(undefined)
      })
    })

    describe('and no branching', function () {
      beforeEach(function () {
        tasks = [
          SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
            taskKey: 'T2',
            answers: [
              { label: 'Red', next: 'S3' },
              { label: 'Blue', next: 'S3' }
            ]
          }))
        ]
      })

      it('should not reset previous to undefined', function () {
        step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks, previous: 'S1' })
        expect(step.previous).to.equal('S1')
        step.reset()
        expect(step.previous).to.equal('S1')
      })

      it('should not reset next to undefined', function () {
        step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks, next: 'S3' })
        expect(step.next).to.equal('S3')
        step.reset()
        expect(step.next).to.equal('S3')
      })
    })
  })
})
