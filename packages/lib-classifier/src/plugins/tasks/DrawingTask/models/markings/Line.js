import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Line as LineComponent } from '../../components/tools'

import Mark from './Mark'

const LineModel = types
  .model('LineModel', {
    x1: types.maybe(types.number),
    y1: types.maybe(types.number),
    x2: types.maybe(types.number),
    y2: types.maybe(types.number)
  })
  .views(self => ({
    get coords () {
      return {
        x: self.x1,
        y: self.y1
      }
    },
    get deleteButtonPosition () {
      const scale = 1
      const BUFFER = 16
      const x = self.x1 > self.x2 ? self.x1 + (BUFFER / scale) : self.x1 - (BUFFER / scale)
      const y = self.y1
      // TODO: check for out of bounds coordinates
      return { x, y }
    },
    get toolComponent () {
      return LineComponent
    }
  }))
  .actions(self => {

    function initialDrag ({ x, y}) {
        self.x2 = x
        self.y2 = y
    }

    function initialPosition ({ x, y }) {
        self.x1 = x
        self.y1 = y
        self.x2 = x
        self.y2 = y
    }

    function move ({ x, y }) {
      self.x1 += x
      self.x2 += x
      self.y1 += y
      self.y2 += y
    }

    function setCoordinates ({ x1, y1, x2, y2 }) {
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
    }

    return {
      initialDrag,
      initialPosition,
      move,
      setCoordinates
    }
  })

const Line = types.compose('Line', Mark, LineModel)

export default Line
