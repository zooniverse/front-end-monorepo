import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'
import { FixedNumber } from '@plugins/drawingTools/types/'


const MINIMUM_POINTS = 20

const singleCoord = types.model({
  x: FixedNumber,
  y: FixedNumber
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
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

    get isValid() {
      return self.points.length > MINIMUM_POINTS
    },

    get tool() {
      return getParentOfType(self, FreehandLineTool)
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
      const path = [`M ${firstCoord.x},${firstCoord.y}`]
      otherCoords.forEach(({ x, y }) => {
        path.push(`L ${x},${y}`)
      })
      // closes the drawing path
      if (self.isCloseToStart) {
        path.push('Z')
      }
      return path.join(' ')
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
      return FreehandLineComponent
    }
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    initialDrag({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    setCoordinates(points) {
      self.points = points
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

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
