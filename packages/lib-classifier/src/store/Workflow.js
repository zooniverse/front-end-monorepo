import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Workflow = types
  .model('Workflow', {
    configuration: types.frozen({}),
    display_name: types.string,
    first_task: types.maybe(types.string),
    steps: types.array(types.array(
      types.union(types.string, types.frozen())
    )),
    tasks: types.maybe(types.frozen()),
    version: types.string
  })

export default types.compose('WorkflowResource', Resource, Workflow)
