import {
  addDisposer,
  getRoot,
  getParentOfType,
  isValidReference,
  types
} from 'mobx-state-tree'
import { Point as PointComponent } from '../../../components'
import { PointTool } from '@plugins/drawingTools/models/tools'

import Mark from '../Mark'

const PointModel = types
  .model('PointModel', {
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.x,
        y: self.y
      }
    },

    deleteButtonPosition(scale) {
      const DELETE_BUTTON_ANGLE = 45
      const theta = DELETE_BUTTON_ANGLE * (Math.PI / 180)
      const dx = (20 / scale) * Math.cos(theta)
      const dy = -1 * (20 / scale) * Math.sin(theta)
      const x = dx
      const y = dy
      return { x, y }
    },

    get tool() {
      return getParentOfType(self, PointTool)
    },

    get toolComponent() {
      return PointComponent
    }
  }))
  .actions((self) => ({
    initialDrag({ x, y }) {
      self.x = x
      self.y = y
    },

    initialPosition({ x, y }) {
      self.x = x
      self.y = y
    },

    move({ x, y }) {
      self.x += x
      self.y += y
    },

    setCoordinates({ x, y }) {
      self.x = x
      self.y = y
    }
  }))

const Point = types.compose('Point', Mark, PointModel)

export default Point
