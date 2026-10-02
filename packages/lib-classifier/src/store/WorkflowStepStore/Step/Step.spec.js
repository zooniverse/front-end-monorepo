import sinon from 'sinon'
import { addMiddleware } from 'mobx-state-tree'
import Step from './Step'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory,
  DrawingTaskFactory,
  TranscriptionTaskFactory
} from '@test/factories'
import * as tasks from '@plugins/tasks'

describe('Model > Step', function () {
  let step
  const {
    single: SingleChoiceTask,
    multiple: MultipleChoiceTask,
    drawing: DrawingTask,
    transcription: TranscriptionTask
  } = tasks

  before(function () {
    step = Step.create({ stepKey: 'S1', taskKeys: ['T1'] })
  })

  it('should exist', function () {
    expect(step).to.exist
    expect(step).to.be.an('object')
  })

  describe('with valid tasks', function () {
    it('should be valid', function () {
      // All tasks default to valid
      expect(step.isValid).to.equal(true)
    })
  })

  describe('with an invalid task', function () {
    let tasks, step
    before(function () {
      tasks = [
        TranscriptionTask.TaskModel.create(TranscriptionTaskFactory.build({
          taskKey: 'T1',
          required: ''
        }))
      ]
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      const mark = step.tasks[0].activeTool.createMark({ id: '1'})
      mark.initialPosition({ x1: 1, y1: 1 })
    })

    it('should be invalid', function () {
      // drawing task or transcription task can be invalid if it has an invalid mark
      // only transcription line currently has logic to be invalid
      // step is invalid if any task evaluates to be invalid
      expect(step.isValid).to.equal(false)
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
      expect(step.isComplete()).to.equal(true)
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
      expect(step.isComplete()).to.equal(false)
    })
  })

  describe('with any incomplete, optional tasks', function () {
    let tasks

    const pointToolWithMin = {
      help: '',
      label: 'Point please.',
      min: 1,
      type: 'point'
    }

    before(function () {
      tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: '' })),
        DrawingTask.TaskModel.create(DrawingTaskFactory.build({ taskKey: 'T3', required: false, tools: [pointToolWithMin] }))
      ]
    })

    it('should be incomplete', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2', 'T3'], tasks })
      expect(step.isComplete()).to.equal(false)
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
      expect(step.isComplete(annotations)).to.equal(false)
    })

    describe('after annotating task T2', function () {
      it('should still be incomplete', function () {
        singleChoiceAnnotation.update(1)
        expect(step.isComplete(annotations)).to.equal(false)
      })
    })

    describe('after annotating tasks T1 & T2', function () {
      it('should be complete', function () {
        multipleChoiceAnnotation.update([1])
        expect(step.isComplete(annotations)).to.equal(true)
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
      expect(step.isThereBranching).to.equal(true)
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
      expect(step.isThereBranching).to.equal(true)
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
      expect(step.isThereBranching).to.equal(true)
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
      expect(step.isThereBranching).to.equal(true)
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
      expect(step.isThereBranching).to.equal(false)
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
      expect(step.isThereBranching).to.equal(false)
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
      expect(step.isThereBranching).to.equal(false)
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
          expect(step.nextStepKey(annotations)).to.equal(undefined)
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

  // sinon can't spy on MST actions, so record them with addMiddleware.
  describe('with reset', function () {
    it('should reset each task', function () {
      const tasks = [
        MultipleChoiceTask.TaskModel.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })),
        SingleChoiceTask.TaskModel.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: '' }))
      ]
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      const calls = []
      addMiddleware(step, (call, next) => {
        calls.push(call.name)
        return next(call)
      })

      step.reset()

      const taskResets = calls.filter(name => name === 'reset')
      expect(taskResets).to.have.lengthOf(step.tasks.length + 1)
    })
  })

  describe('on next or finish', function () {
    let calls

    before(function () {
      const tasks = [
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
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      calls = []
      addMiddleware(step, (call, next) => {
        calls.push(call.name)
        return next(call)
      })
      step.completeAndValidate([])
    })

    it('should validate each step task', function () {
      expect(calls.filter(name => name === 'validate')).to.have.lengthOf(2)
    })

    it('should complete each step task', function () {
      expect(calls.filter(name => name === 'complete')).to.have.lengthOf(2)
    })
  })
})
