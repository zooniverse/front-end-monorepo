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
    get toolComponent () {
      return LineComponent
    }
  }))
  .actions(self => {

    function setCoordinates (event) {
      if (!self.x1) {
        self.x1 = event.x
        self.y1 = event.y
        self.x2 = event.x
        self.y2 = event.y
      } else {
        self.x2 = event.x
        self.y2 = event.y
      }
    }

    return {
      setCoordinates
    }
  })

const Line = types.compose('Line', Mark, LineModel)

export default Line
