import { types } from 'mobx-state-tree'

const Mark = types.model('Mark', {
  id: types.identifier,
  frame: types.optional(types.number, 0),
  toolIndex: types.optional(types.number, 0)
})
  .views(self => ({
    get isValid () {
      return true
    }
  }))

export default Mark
