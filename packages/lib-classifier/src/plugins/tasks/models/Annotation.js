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

export default Annotation
