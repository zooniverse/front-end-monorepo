import { types } from 'mobx-state-tree'
import Resource from './Resource'
import Step from './Step'

const Workflow = types
  .model('Workflow', {
    configuration: types.frozen({}),
    display_name: types.string,
    first_task: types.string,
    steps: types.map(Step),
    tasks: types.maybe(types.frozen())
  })

export default types.compose(Resource, Workflow)
