import { types } from 'mobx-state-tree'

import layouts from '../helpers/layouts'

const SubjectViewer = types
  .model('SubjectViewer', {
    annotate: types.optional(types.boolean, true),
    fullscreen: types.optional(types.boolean, false),
    move: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default)
  })

  .volatile(self => ({
    /*
    Callback function for subject viewers with custom zoom handlers.
    - 'type': 'zoomin', 'zoomout', 'zoomto'
    - 'zoomValue' defines amount zoomed in/out, or current zoom value of 'zoomto'.
     */
    onZoom: function (type, zoomValue) {},
  }))

  .views(self => ({
    get interactionMode () {
      if (self.annotate && !self.move) return 'annotate'
      if (!self.annotate && self.move) return 'move'
      
      return 'annotate'  // Default interaction mode
    }
  }))

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
      self.onZoom && self.onZoom('zoomto', 1.0)
    },

    rotate () {
      console.log('rotating subject')
    },

    setLayout (layout = layouts.DefaultLayout) {
      self.layout = layout
    },
    
    setOnZoom (callback) {
      self.onZoom = callback
    },

    zoomIn () {
      console.log('zooming in')
      self.onZoom && self.onZoom('zoomin', 1)
    },

    zoomOut () {
      console.log('zooming out')
      self.onZoom && self.onZoom('zoomout', -1)
    }
  }))

export default SubjectViewer
