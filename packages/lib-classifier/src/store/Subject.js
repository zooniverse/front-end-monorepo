import { types } from 'mobx-state-tree'

const Subject = types
  .model('Subject', {
    id: types.identifier(types.string),
    locations: types.frozen
  })

export default Subject
