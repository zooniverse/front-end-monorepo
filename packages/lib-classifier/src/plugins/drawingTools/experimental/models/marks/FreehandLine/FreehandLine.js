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
        if (self.dragPoint) {
          const { x, y } = self.initialPoint
          path.push(`L ${x},${y}`)
        } else {
          path.push(`Z`)
        }
      }
      return path.join(' ')
    },

    get isClosed() {
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
    clipPath: types.array(SingleCoord),
    dragPoint: types.maybeNull(SingleCoord),
    originalPath: types.array(SingleCoord),
    targetPoint: types.maybeNull(SingleCoord)
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      self.points.push({ x, y })
      self.dragPoint = null
      self.targetPoint = null
      self.clipPath = []
    },

    initialDrag({ x, y }) {
      self.points.push({ x: x, y: y })
    },

    setCoordinates(points) {
      self.points = points.map(({ x, y }) => ({ x, y }))
    },

    move() {
      return
    },

    appendPath({ x, y }) {
      if (!self.isClosed) {
        self.points.push({ x, y})
      } else {
        self.clipPath = []
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
      if (self.isCloseToStart) {
        self.clipPath = []
      }
    },

    cancelClipPath() {
      self.setCoordinates(self.originalPath)
      self.setClipPath([])
    },

    cutSegment(startPoint, endPoint) {
      /*
        If the line has already been cut into subpaths, restore the original path.
        Note that this will overwrite both dragPoint and targetPoint.
      */
      if (self.clipPath.length > 0) {
        self.setCoordinates(self.originalPath)
      } else {
        self.originalPath = self.points.map(({ x, y }) => ({ x, y }))
      }
      const dragPoint = self.selectPoint(startPoint)
      let startIndex = self.points.indexOf(dragPoint)
      const targetPoint = self.selectPoint(endPoint)
      let endIndex = self.points.indexOf(targetPoint)
      let spansStartPoint = false
      let firstPoint = Math.min(startIndex, endIndex)
      let lastPoint = Math.max(startIndex, endIndex)
      if (self.isClosed) {
        const deleteCount = lastPoint - firstPoint - 1
        const distFromEnd = self.points.length - lastPoint - 1
        const distFromStart = firstPoint
        spansStartPoint = (distFromEnd + distFromStart) < deleteCount
      }
      if (!spansStartPoint) {
        /*
          Reverse the path, if necessary, so that the first point clicked
          is always the draggable point.
        */
        if (firstPoint === endIndex) {
          self.points.reverse()
          firstPoint = self.points.indexOf(dragPoint)
          lastPoint = self.points.indexOf(targetPoint)
        }
        /*
        Segment lies entirely within the line path, so splice points
        from dragIndex to targetIndex.
        */
        self.splice(firstPoint, lastPoint)
      } else {
        /*
          Reverse the path, if necessary, so that the first point clicked
          is always at the end of the new line. The end of an open line
          is the draggable point.
        */
        if (lastPoint === endIndex) {
          self.points.reverse()
          lastPoint = self.points.indexOf(dragPoint)
          firstPoint = self.points.indexOf(targetPoint)
        }
        /*
        Segment spans the start point of a closed loop, so
        trim the ends of the line back to dragIndex and targetIndex.
        */
        self.trim(firstPoint, lastPoint)
      }
    },

    revertEdits() {
      self.cancelClipPath()
      self.dragPoint = null
      self.targetPoint = null
    },

    setClipPath(points = []) {
      self.clipPath = points
    },

    setDragPoint(point) {
      self.dragPoint = point ? self.selectPoint(point) : null
    },

    setTargetPoint(point) {
      self.targetPoint = point ? self.selectPoint(point) : null
    },

    shortenPath() {
      let lengthToRemove = 20
      while (lengthToRemove--) {
        self.points.pop()
      }
    },

    splice(startIndex, endIndex) {
      const deleteCount = endIndex - startIndex - 1
      const clippedPoints = self.points.slice(startIndex, endIndex + 1)
      self.clipPath = clippedPoints.map(({ x, y }) => ({ x, y }))
      self.points.splice(startIndex + 1, deleteCount)
      // Make the ends of the spliced section draggable.
      self.dragPoint = self.points[startIndex]
      self.targetPoint = self.points[startIndex + 1]
    },

    trim(startIndex, endIndex) {
      const clippedPoints = [ ...self.points.slice(endIndex), ...self.points.slice(0, startIndex + 1)]
      self.clipPath = clippedPoints.map(({ x, y }) => ({ x, y }))
      // Move the end of the line back to endIndex
      self.points.splice(endIndex + 1)
      // Move the start of the line forward to startIndex 
      self.points.splice(0, startIndex)
      // Make the ends of the new, open line draggable.
      self.dragPoint = null
      self.targetPoint = null
    }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
