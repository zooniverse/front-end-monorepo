import sinon from 'sinon'
import Step from './Step'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'
import taskRegistry from '@plugins/tasks'
import createStore from '../../helpers/createStore'

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
    describe('default behavior', function () {
      it('should be the next step in map order', function () {
        const stepOneTasks = [
          MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: '' })
        ]
        const stepTwoTasks = [
          SingleChoiceTaskFactory.build({ taskKey: 'T2' })
        ]
        const store = createStore({
          workflowSteps: {
            active: 'S1',
            steps: {
              S1: {
                stepKey: 'S1',
                taskKeys: ['T1'],
                tasks: stepOneTasks
              },
              S2: {
                stepKey: 'S2',
                taskKeys: ['T2'],
                tasks: stepTwoTasks
              }
            }
          }
        })
        expect(store.workflowSteps.active.nextStepKey()).to.equal('S2')

      })
    })

    describe('with a single choice branching task', function () {
      let store
      before(function () {
        const stepOneTasks = [
          SingleChoiceTaskFactory.build({
            taskKey: 'T2',
            required: '',
            answers: [
              { label: 'Red', next: 'S2' },
              { label: 'Blue', next: 'S3' }
            ]
          })
        ]
        const stepTwoTasks = [
          MultipleChoiceTaskFactory.build({
            taskKey: 'T3'
          })
        ]
        const stepThreeTasks = [
          MultipleChoiceTaskFactory.build({
            taskKey: 'T4'
          })
        ]
        store = createStore({
          workflowSteps: {
            active: 'S1',
            steps: {
              S1: {
                stepKey: 'S1',
                taskKeys: ['T2'],
                tasks: stepOneTasks
              },
              S2: {
                stepKey: 'S2',
                taskKeys: ['T3'],
                tasks: stepTwoTasks
              },
              S3: {
                stepKey: 'S2',
                taskKeys: ['T4'],
                tasks: stepThreeTasks
              }
            }
          }
        })
      })

      describe('and no selected answer', function () {
        it('should be undefined', function () {
          expect(store.workflowSteps.active.nextStepKey()).to.be.undefined()
        })
      })

      describe('and a selected answer', function () {
        it('should be answer.next', function () {
          const annotations = [{ task: 'T2', taskType: 'single', value: 0 }]
          expect(store.workflowSteps.active.nextStepKey(annotations)).to.equal('S2')
          const newAnnotations = [{ task: 'T2', taskType: 'single', value: 1 }]
          expect(store.workflowSteps.active.nextStepKey(newAnnotations)).to.equal('S3')
        })
      })
    })

    describe('with step recursion', function () {
      it('should be step.next', function () {
        const store = createStore({
          workflowSteps: {
            active: 'S2',
            steps: {
              S1: {
                stepKey: 'S1',
                taskKeys: ['T1'],
                tasks: [
                  MultipleChoiceTaskFactory.build({
                    taskKey: 'T1'
                  })
                ]
              },
              S2: {
                stepKey: 'S2',
                taskKeys: ['T3'],
                tasks: [
                  MultipleChoiceTaskFactory.build({
                    taskKey: 'T3'
                  })
                ],
                next: 'S1'
              }
            }
          }
        })

        expect(store.workflowSteps.active.nextStepKey()).to.equal('S1')
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
})
