import { types } from 'mobx-state-tree'

const Resource = types
  .model('Resource', {
    id: types.identifier
  })

export default Resource
