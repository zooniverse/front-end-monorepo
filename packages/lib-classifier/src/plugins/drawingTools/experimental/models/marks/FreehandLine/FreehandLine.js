import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'
import { FixedNumber } from '@plugins/drawingTools/types/'

const LINE_RESOLUTION = 0.5
const MINIMUM_POINTS = 20

const SingleCoord = types.model('SingleCoord', {
  x: FixedNumber,
  y: FixedNumber
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
    pathX: types.array(FixedNumber),
    pathY: types.array(FixedNumber)
  })
  .views((self) => ({
    get coords() {
      const [x] = self.pathX
      const [y] = self.pathY
      return { x, y }
    },

    deleteButtonPosition(scale) {
      const BUFFER = 16
      const x = self.pathX[0] - BUFFER / scale
      const y = self.pathY[0] - BUFFER / scale
      return { x, y }
    },

    get isValid() {
      return self.pathX.length > MINIMUM_POINTS
    },

    get tool() {
      return getParentOfType(self, FreehandLineTool)
    },

    get initialPoint() {
      const [x] = self.pathX
      const [y] = self.pathY
      if (!x) {
        return null
      }
      return { x, y }
    },

    get lastPoint() {
      const x = self.pathX.at(-1)
      const y = self.pathY.at(-1)
      if (!x) {
        return null
      }
      return { x, y }
    },

    get points() {
      return self.pathX.map((x, index) => {
        const y = self.pathY[index]
        return { x, y }
      })
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
      self.pathX.push(x)
      self.pathY.push(y)
      self.dragPoint = null
      self.targetPoint = null
      self.clipPath = []
    },

    initialDrag({ x, y }) {
      const dist = self.getDistance(x, y, self.lastPoint.x, self.lastPoint.y)
      if (dist > LINE_RESOLUTION) {
        self.pathX.push(x)
        self.pathY.push(y)
      }
    },

    setCoordinates(points) {
      self.pathX = points.map(({ x, y }) => x)
      self.pathY = points.map(({ x, y }) => y)
    },

    move() {
      return
    },

    appendPath({ x, y }) {
      const dist = self.getDistance(x, y, self.lastPoint.x, self.lastPoint.y)
      if (dist > LINE_RESOLUTION && !self.isClosed) {
        self.pathX.push(x)
        self.pathY.push(y)
      }
      if (self.isClosed) {
        self.clipPath = []
      }
    },

    splicePath({ x, y }) {
      if (!self.targetPoint) {
        return true
      }
      const dist = self.getDistance(x, y, self.dragPoint.x, self.dragPoint.y)
      if (dist > LINE_RESOLUTION) {
        const dragIndex = self.points.indexOf(self.dragPoint)
        const nextPoint = dragIndex + 1
        self.pathX.splice(nextPoint, 0, x)
        self.pathY.splice(nextPoint, 0, y)
        self.dragPoint = self.points[nextPoint]
        if (self.isCloseToStart) {
          self.clipPath = []
        }
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
      if (self.isClosed) {
        const firstPoint = Math.min(startIndex, endIndex)
        const lastPoint = Math.max(startIndex, endIndex)
        const deleteCount = lastPoint - firstPoint - 1
        const distFromEnd = self.points.length - lastPoint - 1
        const distFromStart = firstPoint
        spansStartPoint = (distFromEnd + distFromStart) < deleteCount
      }
      if (!spansStartPoint) {
        /*
        Segment lies entirely within the line path, so splice points
        from dragIndex to targetIndex.
        */
        self.splice(startIndex, endIndex)
      } else {
        /*
        Segment spans the start point of a closed loop, so
        trim the ends of the line back to dragIndex and targetIndex.
        */
        self.trim(startIndex, endIndex)
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
        self.pathX.pop()
        self.pathY.pop()
      }
    },

    splice(startIndex, endIndex) {
      let firstPoint = Math.min(startIndex, endIndex)
      let lastPoint = Math.max(startIndex, endIndex)
      /*
        Reverse the path, if necessary, so that the first point clicked
        is always the draggable point.
      */
      if (firstPoint === endIndex) {
        const lastIndex = self.points.length - 1
        self.pathX.reverse()
        self.pathY.reverse()
        firstPoint = lastIndex - startIndex
        lastPoint = lastIndex - endIndex
      }
      const deleteCount = lastPoint - firstPoint - 1
      const clippedPoints = self.points.slice(firstPoint, lastPoint + 1)
      self.clipPath = clippedPoints.map(({ x, y }) => ({ x, y }))
      self.pathX.splice(firstPoint + 1, deleteCount)
      self.pathY.splice(firstPoint + 1, deleteCount)
      // Make the ends of the spliced section draggable.
      self.dragPoint = self.points[firstPoint]
      self.targetPoint = self.points[firstPoint + 1]
    },

    trim(startIndex, endIndex) {
      let firstPoint = Math.min(startIndex, endIndex)
      let lastPoint = Math.max(startIndex, endIndex)
      /*
        Reverse the path, if necessary, so that the first point clicked
        is always at the end of the new line. The end of an open line
        is the draggable point.
      */
      if (lastPoint === endIndex) {
        const lastIndex = self.points.length - 1
        self.pathX.reverse()
        self.pathY.reverse()
        lastPoint = lastIndex - startIndex
        firstPoint = lastIndex - endIndex
      }
      const clippedPoints = [ ...self.points.slice(lastPoint), ...self.points.slice(0, firstPoint + 1)]
      self.clipPath = clippedPoints.map(({ x, y }) => ({ x, y }))
      // Move the end of the line back to lastPoint.
      self.pathX.splice(lastPoint + 1)
      self.pathY.splice(lastPoint + 1)
      // Move the start of the line forward to firstPoint.
      self.pathX.splice(0, firstPoint)
      self.pathY.splice(0, firstPoint)
      // Make the ends of the new, open line draggable.
      self.dragPoint = null
      self.targetPoint = null
    }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
