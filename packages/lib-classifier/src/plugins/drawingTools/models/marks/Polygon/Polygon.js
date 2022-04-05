import { getParentOfType, types } from 'mobx-state-tree'
import { Polygon as PolygonComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { PolygonTool } from '@plugins/drawingTools/models/tools'
import roundCoordinates from '@helpers/roundCoordinates'

const MINIMUM_POINTS = 3

const singleCoord = types.model({
  x: types.maybe(types.number),
  y: types.maybe(types.number)
})

const PolygonModel = types
  .model('PolygonModel', {
    points: types.array(singleCoord)
  })
  .volatile(() => ({
    guideLineX: types.maybe(types.number),
    guideLineY: types.maybe(types.number)
  }))
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

    get isValid() {
      return self.points.length >= MINIMUM_POINTS
    },

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
      const lastCoord = [...self.points].pop()
      if (!lastCoord) {
        return null
      }
      return lastCoord
    },

    // path = string. Used to create the <polyline>
    get path() {
      const [firstCoord, ...otherCoords] = self.points
      if (!firstCoord) {
        return ''
      }
      let path = `${firstCoord.x},${firstCoord.y} `
      otherCoords.forEach(({ x, y }) => {
        path = path + `${x},${y} `
      })
      return path
    },

    get toolComponent() {
      return PolygonComponent
    }
  }))
  .actions((self) => ({
    initialDrag() {},

    initialPosition({ x, y }) {
      const roundedCoords = roundCoordinates({ x: x, y: y })
      self.points.push({ x: roundedCoords.roundedX, y: roundedCoords.roundedY })
    },

    move({ x, y }) {
      return self.points.map((coord) => {
        coord.x += x
        coord.y += y
      })
    },

    setCoordinates({ x, y }, i) {
      const roundedCoords = roundCoordinates({ x: x, y: y })

      self.points[i].x = roundedCoords.roundedX
      self.points[i].y = roundedCoords.roundedY
    },

    appendPath({ x, y }) {
      const roundedCoords = roundCoordinates({ x: x, y: y })
      self.points.push({ x: roundedCoords.roundedX, y: roundedCoords.roundedY })
    },

    shortenPath() {
      let lengthToRemove = 1
      while (lengthToRemove--) {
        self.points.pop()
      }
    },

    setGuideLine(event) {
      self.guideLineX = event.x
      self.guideLineY = event.y
    }
  }))

const Polygon = types.compose('Polygon', Mark, PolygonModel)

export default Polygon
