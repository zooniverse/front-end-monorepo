import { types } from 'mobx-state-tree'

const Mark = types.model('Mark', {
  id: types.identifier,
  toolIndex: types.optional(types.number, 0)
})

export default Mark
