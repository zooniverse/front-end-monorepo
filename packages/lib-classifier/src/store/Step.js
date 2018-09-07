import { types } from 'mobx-state-tree'

export const BaseStep = types
  .model('BaseStep', {
    stepKey: types.identifier,
    taskKeys: types.array(types.string)
  })

export const NextStepReference = types
  .model('NextStepReference', {
    next: types.maybe(types.reference(BaseStep)), // We have this optionally to support recursive workflows
  })

const Step = types.compose('Step', BaseStep, NextStepReference)

export default Step