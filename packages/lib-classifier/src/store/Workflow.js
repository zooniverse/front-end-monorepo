import { addDisposer, getRoot, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import Resource from './Resource'

const Workflow = types
  .model('Workflow')

export default types.compose(Resource, Workflow)
