import { types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'
import subjectViewers from '../helpers/subjectViewers'

const Classifier = types
  .model('Classifier', {
    annotate: types.optional(types.boolean, true),
    fullscreen: types.optional(types.boolean, false),
    move: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default)
  })

  .volatile(self => ({
    mouseEventStream: null
  }))

  .actions(self => ({
    clearStream () {
      this.mouseEventStream = null
    },

    enableAnnotate () {
      self.annotate = true
      self.move = false
    },

    enableFullscreen () {
      self.fullscreen = true
    },

    enableMove () {
      self.annotate = false
      self.move = true
    },

    disableFullscreen () {
      self.fullscreen = false
    },

    setLayout (layout = layouts.DefaultLayout) {
      self.layout = layout
    },

    setStream (stream) {
      self.mouseEventStream = stream
    }
  }))

export default Classifier
