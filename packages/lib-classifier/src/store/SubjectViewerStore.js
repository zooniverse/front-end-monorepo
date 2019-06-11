import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'

const SubjectViewer = types
  .model('SubjectViewer', {
    annotate: types.optional(types.boolean, true),
    dimensions: types.array(types.frozen({
      clientHeight: types.integer,
      clientWidth: types.integer,
      naturalHeight: types.integer,
      naturalWidth: types.integer
    })),
    fullscreen: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default),
    loadingState: types.optional(types.enumeration('loadingState', asyncStates.values), asyncStates.initialized),
    move: types.optional(types.boolean, false)
  })

  .volatile(self => ({
    /*
    Callback function for subject viewers with custom zoom handlers.
    - 'type': 'zoomin', 'zoomout', 'zoomto'
    - 'zoomValue' defines amount zoomed in/out, or current zoom value of 'zoomto'.
     */
    onZoom: function (type, zoomValue) {},
    onPan: function (value) {}
  }))

  .views(self => ({
    get interactionMode () {
      // Default interaction mode is 'annotate'
      return (!self.annotate && self.move) ? 'move' : 'annotate'
    }
  }))

  .actions(self => {
    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        const subject = getRoot(self).subjects.active
        if (subject) {
          self.resetSubject()
        }
      }, { name: 'SubjectViewerStore Subject Observer' })
      addDisposer(self, subjectDisposer)
    }

    return {
      afterAttach () {
        createSubjectObserver()
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

      onError (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      },

      onSubjectReady (event) {
        const { target = {} } = event || {}
        const {
          clientHeight = 0,
          clientWidth = 0,
          naturalHeight = 0,
          naturalWidth = 0
        } = target
        self.dimensions.push({ clientHeight, clientWidth, naturalHeight, naturalWidth })
        self.loadingState = asyncStates.success
      },

      resetSubject () {
        self.loadingState = asyncStates.loading
        self.dimensions = []
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

      setOnPan (callback) {
        self.onPan = callback
      },

      zoomIn () {
        console.log('zooming in')
        self.onZoom && self.onZoom('zoomin', 1)
      },

      zoomOut () {
        console.log('zooming out')
        self.onZoom && self.onZoom('zoomout', -1)
      }
    }
  })

export default SubjectViewer
