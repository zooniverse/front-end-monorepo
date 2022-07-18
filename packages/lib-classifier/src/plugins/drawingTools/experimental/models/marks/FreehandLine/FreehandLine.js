import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'
import { FixedNumber } from '@plugins/drawingTools/types/'


const MINIMUM_POINTS = 20

const SingleCoord = types.model('SingleCoord', {
  x: FixedNumber,
  y: FixedNumber
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
    points: types.array(SingleCoord)
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
      otherCoords.forEach(point => {
        const { x, y } = point
        const pointPath = point === self.targetPoint ? `M ${x},${y}` : `L ${x},${y}`
        path.push(pointPath)
      })
      // closes the drawing path
      if (self.isClosed) {
        path.push('Z')
      }
      return path.join(' ')
    },

    get isClosed() {
      if (self.dragPoint) {
        return false
      }
      const firstPoint = self.initialPoint
      const lastPoint = self.lastPoint
      if (firstPoint && lastPoint) {
        const dist = self.getDistance(firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y)
        return dist < 10
      }
      return false
    },

    // this determines if drawing point is close to initial point
    get isCloseToStart() {
      const { dragPoint, targetPoint } = self
      if (dragPoint && targetPoint) {
        const dist = self.getDistance(dragPoint.x, dragPoint.y, targetPoint.x, targetPoint.y)
        return dist < 10
      }
      return false
    },

    get toolComponent() {
      return FreehandLineComponent
    },

    selectPoint({ x, y }) {
      const distances = self.points.map(point => self.getDistance(x, y, point.x, point.y))
      const minDistance = Math.min(...distances)
      const selectedIndex = distances.indexOf(minDistance)
      return self.points[selectedIndex]
    }
  }))
  .volatile(self => ({
    dragPoint: types.maybeNull(SingleCoord),
    targetPoint: types.maybeNull(SingleCoord)
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      self.points.push({ x, y })
      self.dragPoint = null
      self.targetPoint = null
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
      if (!self.isClosed) {
        self.points.push({ x, y})
      }
    },

    splicePath({ x, y }) {
      if (!self.targetPoint) {
        return true
      }
      const dragIndex = self.points.indexOf(self.dragPoint)
      const nextPoint = dragIndex + 1
      self.points.splice(nextPoint, 0, { x, y })
      self.dragPoint = self.points[nextPoint]
    },

    cutSegment(point) {
      const dragIndex = self.points.indexOf(self.dragPoint)
      const targetIndex = self.points.indexOf(point)
      if ( targetIndex > dragIndex ) {
        const deleteCount = targetIndex - dragIndex
        self.points.splice(dragIndex + 1, deleteCount)
        self.targetPoint = self.points[dragIndex + 1]
      } else {
        const deleteCount = dragIndex - targetIndex
        self.points.splice(targetIndex + 1, deleteCount)
        self.dragPoint = self.points[targetIndex]
        self.targetPoint = self.points[targetIndex + 1]
      }
    },

    setDragPoint(point) {
      self.dragPoint = point
    },

    setTargetPoint(point) {
      self.targetPoint = point
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
