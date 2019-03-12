import { types } from 'mobx-state-tree'
import { Subject } from 'rxjs'

const DrawingStore = types
  .model('DrawingStore')

  .volatile(self => ({
    eventStream: new Subject()
  }))

  .actions(self => ({
    addToStream (event) {
      self.eventStream.next(event)
    }
  }))

export default DrawingStore
