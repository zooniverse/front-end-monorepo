import { types } from 'mobx-state-tree'

const Workflow = types
  .model('Workflow', {
    id: types.identifier(types.string)
  })

export default Workflow
