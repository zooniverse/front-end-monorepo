import cuid from 'cuid'
import { getRoot, getSnapshot, types } from 'mobx-state-tree'

const Annotation = types.model('Annotation', {
  id: types.identifier,
  task: types.string,
  taskType: types.literal('default')
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
  .volatile(self => ({
    _inProgress: false
  }))
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
      self._inProgress = true
      const { authClient } = getRoot(self)
      authClient?.checkBearerToken()
    }
  }))

export default Annotation
