import { types } from 'mobx-state-tree'

const DrawingStore = types
  .model('DrawingStore')

  .volatile(self => ({
    mouseEventStream: null
  }))

  .actions(self => ({
    clearStream () {
      this.mouseEventStream = null
    },

    addToStream (stream) {
      self.mouseEventStream = stream
    }
  }))

export default DrawingStore
