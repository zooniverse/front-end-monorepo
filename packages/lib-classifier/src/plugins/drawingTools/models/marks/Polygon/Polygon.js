import { getParentOfType, types } from 'mobx-state-tree'
import { Polygon as PolygonComponent } from '@plugins/drawingTools/components/'
import { FixedNumber } from '@plugins/drawingTools/types/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { PolygonTool } from '@plugins/drawingTools/models/tools'

const MINIMUM_POINTS = 3

const SingleCoord = types
  .model({
    x: FixedNumber,
    y: FixedNumber
  })
  .actions(self => ({
    moveTo({ x, y }) {
      self.x = x
      self.y = y
    }
  }))


const PolygonModel = types
  .model('PolygonModel', {
    points: types.array(SingleCoord)
  })
  .volatile(() => ({
    guideLineX: types.maybe(types.number),
    guideLineY: types.maybe(types.number)
  }))
  .views((self) => ({
    get coords() {
      return {
        x: self.initialPoint?.x,
        y: self.initialPoint?.y
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
      const lastCoord = self.points[self.points.length - 1]
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
      const path = self.points.map(({ x, y }) => `${x},${y}`)
      return path.join(' ')
    },

    get toolComponent() {
      return PolygonComponent
    }
  }))
  .actions((self) => ({
    initialDrag({ x, y }) {
      const newPoint = SingleCoord.create({ x, y })
      const { initialPoint } = self
      if (newPoint.x !== initialPoint.x && newPoint.y !== initialPoint.y) {
        self.points[1] = newPoint
      }
    },

    initialPosition({ x, y }) {
      self.points[0] = { x, y }
    },

    move({ x, y }) {
      return self.points.map((coord) => {
        coord.x += x
        coord.y += y
      })
    },

    setCoordinates(points) {
      self.points = points
    },

    appendPath({ x, y }) {
      self.points.push({ x, y })
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
