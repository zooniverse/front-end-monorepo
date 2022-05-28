import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import layouts from '@helpers/layouts'

const SubjectViewer = types
  .model('SubjectViewer', {
    annotate: types.optional(types.boolean, true),
    dimensions: types.array(types.frozen({
      clientHeight: types.integer,
      clientWidth: types.integer,
      naturalHeight: types.integer,
      naturalWidth: types.integer
    })),
    frame: types.optional(types.integer, 0),
    fullscreen: types.optional(types.boolean, false),
    invert: types.optional(types.boolean, false),
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default),
    loadingState: types.optional(types.enumeration('loadingState', asyncStates.values), asyncStates.initialized),
    move: types.optional(types.boolean, false),
    rotationEnabled: types.optional(types.boolean, false),
    rotation: types.optional(types.number, 0)
  })

  .volatile(self => ({
    /*
    Callback function for subject viewers with custom zoom handlers.
    - 'type': 'zoomin', 'zoomout', 'zoomto'
    - 'zoomValue' defines amount zoomed in/out, or current zoom value of 'zoomto'.
     */
    onZoom: function (type, zoomValue) {},
    /*
    Callback function for subject viewers with custom pan handlers.
    - 'xDirection': -1: left, 0: ignored, 1: right
    - 'yDirection': -1: up, 0: ignored, 1: down
     */
    onPan: function (xDirection, yDirection) {}
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
        const validSubjectReference = isValidReference(() => getRoot(self).subjects.active)
        if (validSubjectReference) {
          const subject = getRoot(self).subjects.active
          self.resetSubject(subject)
        }
      }, { name: 'SubjectViewerStore Subject Observer autorun' })
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

      enableRotation () {
        self.rotationEnabled = true
      },

      disableFullscreen () {
        self.fullscreen = false
      },

      invertView () {
        console.log('invert view')
        self.invert = !self.invert
      },

      onError (error) {
        if (process.browser || process.env.NODE_ENV === 'test') console.error(error)
        self.loadingState = asyncStates.error
      },

      onSubjectReady (event) {
        const { target = {} } = event || {}
        const {
          clientHeight = 0,
          clientWidth = 0,
          naturalHeight = 0,
          naturalWidth = 0
        } = target || {}
        self.dimensions.push({ clientHeight, clientWidth, naturalHeight, naturalWidth })
        self.rotation = 0
        self.loadingState = asyncStates.success
      },

      panLeft () {
        self.onPan && self.onPan(-1, 0)
      },

      panRight () {
        self.onPan && self.onPan(1, 0)
      },

      panUp () {
        self.onPan && self.onPan(0, -1)
      },

      panDown () {
        self.onPan && self.onPan(0, 1)
      },

      resetSubject (subject) {
        let frame = 0
        if (subject?.metadata?.default_frame >= 0) {
          frame = parseInt(subject.metadata.default_frame)
        }
        self.dimensions = []
        self.frame = frame
        self.loadingState = asyncStates.loading
        self.rotation = 0
      },

      resetView () {
        console.log('resetting view')
        self.invert = false
        self.onZoom && self.onZoom('zoomto', 1.0)
        self.rotation = 0
      },

      rotate () {
        console.log('rotating subject')
        self.rotation -= 90
      },

      setFrame (index) {
        self.frame = index
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
