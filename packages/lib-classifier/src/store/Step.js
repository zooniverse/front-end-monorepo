import { types } from 'mobx-state-tree'

const Step = types
  .model('Step', {
    next: types.optional(types.string, ''), // We have this optionally to support recursive workflows
    stepKey: types.identifier,
    taskKeys: types.array(types.string)
  })

export default Step