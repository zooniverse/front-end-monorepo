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

  describe('with valid tasks', function () {
    it('should be valid', function () {
      // All tasks default to valid
      // drawing task can be invalid if it has an invalid mark
      // this is tested in the transcription line tool specs
      expect(step.isValid).to.be.true()
    })
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
      expect(step.isComplete()).to.be.true()
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
      expect(step.isComplete()).to.be.false()
    })
  })

  describe('with only required tasks', function () {
    let annotations
    let multipleChoiceAnnotation
    let singleChoiceAnnotation
    let step
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: 'true' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: 'true' }))
      ]
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      multipleChoiceAnnotation = tasks[0].defaultAnnotation()
      singleChoiceAnnotation = tasks[1].defaultAnnotation()
      annotations = [multipleChoiceAnnotation, singleChoiceAnnotation]
    })

    it('should be incomplete', function () {
      expect(step.isComplete(annotations)).to.be.false()
    })

    describe('after annotating task T1', function () {
      it('should still be incomplete', function () {
        multipleChoiceAnnotation.update([1])
        expect(step.isComplete(annotations)).to.be.false()
      })
    })

    describe('after annotating tasks T1 & T2', function () {
      it('should be complete', function () {
        singleChoiceAnnotation.update(1)
        expect(step.isComplete(annotations)).to.be.true()
      })
    })
  })

  describe('with a single choice branching task, two unique next steps', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Yes', next: 'S2' },
            { label: 'No', next: 'S3' }
          ]
        }))
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

  describe('nextStepKey()', function () {
    describe('without a single choice branching task', function () {
      let tasks
      before(function () {
        tasks = [
          MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '', next: 'T2' })
        ]
      })

      it('should be step.next', function () {
        const step = Step.create({ stepKey: 'S1', taskKeys: ['T1'], tasks, next: 'S2' })
        const annotations = [{ task: 'T1', taskType: 'multiple', value: [0,1] }]
        expect(step.nextStepKey(annotations)).to.equal('S2')
      })
    })

    describe('with a single choice branching task', function () {
      let tasks
      before(function () {
        tasks = [
          SingleChoiceTaskFactory.build({
          taskKey: 'T2',
          required: '',
          answers: [
            { label: 'Red', next: 'T1' },
            { label: 'Blue', next: 'T3' }
          ]
        })
        ]
      })

      describe('and no selected answer', function () {
        it('should be undefined', function () {
          const step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks })
          const annotations = []
          expect(step.nextStepKey(annotations)).to.be.undefined()
        })
      })

      describe('and a selected answer', function () {
        it('should be answer.next', function () {
          const step = Step.create({ stepKey: 'S2', taskKeys: ['T2'], tasks })
          const annotations = [{ task: 'T2', taskType: 'single', value: 0 }]
          expect(step.nextStepKey(annotations)).to.equal('T1')
        })
      })
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
  })

  describe('on next or finish', function () {
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
      tasks.forEach(task => {
        sinon.spy(task, 'complete')
        sinon.spy(task, 'validate')
      })
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.completeAndValidate([])
    })

    after(function () {
      tasks.forEach(task => {
        task.complete.restore()
        task.validate.restore()
      })
    })

    it('should validate each step task', function () {
      tasks.forEach(task => {
        expect(task.validate).to.have.been.calledOnce()
      })
    })

    it('should complete each step task', function () {
      tasks.forEach(task => {
        expect(task.complete).to.have.been.calledOnce()
      })
    })
  })
})
