import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import { Point as PointComponent } from '../../components/tools'

import Mark from './Mark'

const PointModel = types
  .model('PointModel', {
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0)
  })
  .views(self => ({
    get toolComponent () {
      return PointComponent
    }
  }))
  .actions(self => {

    function setCoordinates (event) {
      self.x = event.x
      self.y = event.y
    }

    return {
      setCoordinates
    }
  })

const Point = types.compose('Point', Mark, PointModel)

export default Point
