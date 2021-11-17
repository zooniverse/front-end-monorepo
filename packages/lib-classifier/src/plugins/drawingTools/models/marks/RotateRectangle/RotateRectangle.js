import { getParentOfType, types } from 'mobx-state-tree'
import { RotateRectangle as RotateRectangleComponent } from '../../../components/'
import { RotateRectangleTool } from '@plugins/drawingTools/models/tools'

import Rectangle from '../Rectangle'

const RotateRectangleModel = types
  .model('RotateRectangleModel', {
    angle: types.optional(types.number, 0)
  })
  .views((self) => ({
    get tool() {
      return getParentOfType(self, RotateRectangleTool)
    },

    get toolComponent() {
      return RotateRectangleComponent
    },

    get x_rotate() {
      return self.x_center
    },

    get y_rotate() {
      return self.y_center
    }
  }))
  .actions((self) => ({
    setCoordinates({ x_left, x_right, y_top, y_bottom, angle }) {
      self.x_center = (x_left + x_right) / 2
      self.y_center = (y_top + y_bottom) / 2
      self.width = Math.abs(x_right - x_left)
      self.height = Math.abs(y_bottom - y_top)
      self.angle = angle
    }
  }))

const RotateRectangle = types.compose(
  'RotateRectangle',
  Rectangle,
  RotateRectangleModel
)

export default RotateRectangle
