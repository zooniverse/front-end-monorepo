import cuid from 'cuid'
import { getSnapshot, types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  id: types.identifier,
  task: types.string,
  taskType: types.string
})
  .preProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // generate annotation IDs, if not present
    newSnapshot.id = snapshot.id || cuid()
    return newSnapshot
  })
  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // remove annotation IDs
    delete newSnapshot.id
    return newSnapshot
  })
  .views(self => ({
    get isComplete () {
      return true
    },

    toSnapshot () {
      return getSnapshot(self)
    }
  }))
  .actions(self => ({
    update (value) {
      self.value = value
    }
  }))

export default Annotation
