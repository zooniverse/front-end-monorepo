import { types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  id: types.identifier,
  task: types.string,
  taskType: types.string
})
  .views(self => ({
    get isComplete () {
      return true
    }
  }))
  .actions(self => ({
    update (value) {
      self.value = value
    }
  }))

export default Annotation
