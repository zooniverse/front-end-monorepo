import Step from './Step'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'
import taskRegistry from '@plugins/tasks'
import ClassificationStore from '@store/ClassificationStore' 

describe('Model > Step', function () {
  let step
  const SingleChoiceTask = taskRegistry.get('single').TaskModel
  const MultipleChoiceTask = taskRegistry.get('multiple').TaskModel

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
        MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: false })),
        SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: false }))
      ]
    })

    it('should be complete', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.classifications = ClassificationStore.create()
      expect(step.isComplete).to.be.true()
    })
  })

  describe('with any incomplete, required tasks', function () {
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: false })),
        SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: true }))
      ]
    })

    it('should be incomplete', function () {
      const step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.classifications = ClassificationStore.create()
      expect(step.isComplete).to.be.false()
    })
  })

  describe('with only required tasks', function () {
    let step
    let tasks
    before(function () {
      tasks = [
        MultipleChoiceTask.create(MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: true })),
        SingleChoiceTask.create(SingleChoiceTaskFactory.build({ taskKey: 'T2', required: true }))
      ]
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.classifications = ClassificationStore.create()
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
      step.classifications.createClassification(mockSubject, mockWorkflow, mockProject)
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
