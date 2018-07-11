import { types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'
import subjectViewers from '../helpers/subjectViewers'

const Classifier = types
  .model('Classifier', {
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default),
    fullscreen: types.optional(types.boolean, false)
  })

  .actions(self => ({
    enableFullscreen () {
      self.fullscreen = true
    },

    disableFullscreen () {
      self.fullscreen = false
    },

    setLayout (layout = layouts.DefaultLayout) {
      self.layout = layout
    }
  }))

export default Classifier
