import { types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'
import subjectViewers from '../helpers/subjectViewers'

const Classifier = types
  .model('Classifier', {
    annotate: types.optional(types.boolean, true),
    fullscreen: types.optional(types.boolean, false),
    move: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default),
  })

  .actions(self => ({
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
    }
  }))

export default Classifier
