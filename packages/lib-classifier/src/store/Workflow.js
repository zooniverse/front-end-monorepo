import { types } from 'mobx-state-tree'
import Resource from './Resource'

// The db type for steps is jsonb which is being serialized as an empty object when not defined.
// Steps will be stored as an array of pairs to preserve order. 
const Workflow = types
  .model('Workflow', {
    configuration: types.frozen({}),
    display_name: types.string,
    first_task: types.maybe(types.string),
    steps: types.union(types.frozen({}), types.array(types.array(
      types.union(types.string, types.frozen())
    ))),
    tasks: types.maybe(types.frozen()),
    version: types.string
  })

export default types.compose('WorkflowResource', Resource, Workflow)
