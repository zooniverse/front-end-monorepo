import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Subject = types
  .model('Subject', {
    locations: types.frozen
  })

export default types.compose(Resource, Subject)
