import { types } from 'mobx-state-tree'
import Resource from './Resource'

// The db type for steps is jsonb which is being serialized as an empty object when not defined.
// Steps will be stored as an array of pairs to preserve order.
const Workflow = types
  .model('Workflow', {
    active: types.optional(types.boolean, false),
    configuration: types.frozen({
      hide_classification_summaries: types.optional(types.boolean, false)
    }),
    display_name: types.string,
    first_task: types.optional(types.string, ''),
    steps: types.union(types.frozen({}), types.array(types.array(
      types.union(types.string, types.frozen())
    ))),
    tasks: types.maybe(types.frozen()),
    version: types.string
  })

export default types.compose('WorkflowResource', Resource, Workflow)
