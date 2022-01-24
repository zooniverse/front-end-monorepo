import { getParentOfType, types } from 'mobx-state-tree'
import { Polygon as PolygonComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { PolygonTool } from '@plugins/drawingTools/models/tools'

const singleCoord = types.model({
  x: types.maybe(types.number),
  y: types.maybe(types.number)
})

const PolygonModel = types
  .model('PolygonModel', {
    points: types.array(singleCoord)
  })
  .views((self) => ({
    get coords() {
      return {
        x: self.points[0]?.x,
        y: self.points[0]?.y
      }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      const x = self.points[0].x - BUFFER / scale
      const y = self.points[0].y - BUFFER / scale
      return { x, y }
    },

    // get isValid() {
    //   return self.points.length > MINIMUM_POINTS
    // },

    get tool() {
      return getParentOfType(self, PolygonTool)
    },

    get initialPoint() {
      const [firstCoord] = self.points
      if (!firstCoord) {
        return null
      }
      return firstCoord
    },

    get lastPoint() {
      const lastCoord = self.points.at(-1)
      if (!lastCoord) {
        return null
      }
      return lastCoord
    },

    get path() {
      const [firstCoord, ...otherCoords] = self.points
      if (!firstCoord) {
        return ''
      }
      let path = `M ${firstCoord.x},${firstCoord.y} `
      otherCoords.forEach(({ x, y }) => {
        path = path + `L ${x},${y}`
      })
      // closes the drawing path
      if (self.isCloseToStart) {
        path += ' Z'
      }
      return path
    },

    // this determines if drawing point is close to initial point
    get isCloseToStart() {
      const firstPoint = self.initialPoint
      const lastPoint = self.lastPoint
      const distX = lastPoint.x - firstPoint.x
      const distY = lastPoint.y - firstPoint.y
      const dist = Math.sqrt(distX * distX + distY * distY)
      return dist < 10
    },

    get toolComponent() {
      return PolygonComponent
    }
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    initialDrag({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    move() {
      return
    },

    appendPath({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    shortenPath() {
      let lengthToRemove = 20
      while (lengthToRemove--) {
        self.points.pop()
      }
    }
  }))

const Polygon = types.compose('Polygon', Mark, PolygonModel)

export default Polygon
