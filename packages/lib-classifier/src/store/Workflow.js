import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Workflow = types
  .model({
    configuration: types.frozen(),
    display_name: types.string,
    tasks: types.maybe(types.frozen())
  })

export default types.compose('Workflow', Resource, Workflow)
