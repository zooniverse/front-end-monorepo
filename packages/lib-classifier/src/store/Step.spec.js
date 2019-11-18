import Step from './Step'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory
} from '@test/factories'
import ClassificationStore from '@store/ClassificationStore' 

describe('Model > Step', function () {
  let step
  before(function () {
    step = Step.create({ stepKey: 'S1', taskKeys: ['T1'] })
  })

  it('should exist', function () {
    expect(step).to.be.ok()
    expect(step).to.be.an('object')
  })
  
  describe('with incomplete, optional tasks', function () {
    it('should be complete', function () {
      const tasks = {
        T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: false }),
        T2: SingleChoiceTaskFactory.build({ taskKey: 'T2', required: false })
      }
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.classifications = ClassificationStore.create()
      expect(step.isComplete).to.be.true()
    })
  })

  describe('with incomplete, required tasks', function () {
    it('should be incomplete', function () {
      const tasks = {
        T1: MultipleChoiceTaskFactory.build({ taskKey: 'T1', required: true }),
        T2: SingleChoiceTaskFactory.build({ taskKey: 'T2', required: true })
      }
      step = Step.create({ stepKey: 'S1', taskKeys: ['T1', 'T2'], tasks })
      step.classifications = ClassificationStore.create()
      expect(step.isComplete).to.be.false()
    })
  })
})
