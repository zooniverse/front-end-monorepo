import { types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  task: types.identifier,
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
