import { types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  task: types.identifier
})
  .views(self => ({
    get isComplete () {
      return true
    }
  }))

export default Annotation
