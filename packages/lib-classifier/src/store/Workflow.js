import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Workflow = types
  .model('Workflow', {
    first_task: types.string,
    tasks: types.frozen
  })

export default types.compose(Resource, Workflow)
