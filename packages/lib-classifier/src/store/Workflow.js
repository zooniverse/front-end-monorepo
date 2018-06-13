import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Workflow = types
  .model('Workflow')

export default types.compose(Resource, Workflow)
