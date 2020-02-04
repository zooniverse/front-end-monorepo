import { getSnapshot, types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  id: types.identifier,
  task: types.string,
  taskType: types.string
})
  .views(self => ({
    get isComplete () {
      return true
    },

    get toSnapshot () {
      const snapshot = getSnapshot(self)
      const { id, ...filteredSnapshot } = snapshot
      return filteredSnapshot
    }
  }))
  .actions(self => ({
    update (value) {
      self.value = value
    }
  }))

export default Annotation
