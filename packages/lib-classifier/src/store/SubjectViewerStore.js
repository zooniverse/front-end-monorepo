import { types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'
import subjectViewers from '../helpers/subjectViewers'

const SubjectViewer = types
  .model('SubjectViewer', {
    annotate: types.optional(types.boolean, true),
    fullscreen: types.optional(types.boolean, false),
    move: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default)
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

    resetView () {
      console.log('resetting view')
    },

    rotate () {
      console.log('rotating subject')
    },

    setLayout (layout = layouts.DefaultLayout) {
      self.layout = layout
    },

    zoomIn () {
      console.log('zooming in')
    },

    zoomOut () {
      console.log('zooming out')
    }
  }))

export default SubjectViewer
