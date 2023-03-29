import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'
import { FixedNumber } from '@plugins/drawingTools/types/'
import { toJS } from 'mobx'

const SingleCoord = types.model('SingleCoord', {
  x: FixedNumber,
  y: FixedNumber
})

const ActionType = types.model('ActionType', {
  type: types.enumeration([
    'append',
    'end',
    'start',
    'splice-append',
    'splice-close-point',
    'splice-drag-point',
    'splice-end'
  ]),
  pointIndexDrag: types.number,
  pointIndexClose: types.number,
  pointsFromDrag: types.array(SingleCoord),
  pointsFromClose: types.array(SingleCoord),
  pointsSpliceCount: types.number,
  isReversed: types.boolean,
  throughBeginning: types.boolean,
})

const FreehandLineModel = types
  .model('FreehandLineModel', {
    pathX: types.array(FixedNumber),
    pathY: types.array(FixedNumber),
  })
  .views((self) => ({
    get isValid() {
      return true
    },

    get tool() {
      return getParentOfType(self, FreehandLineTool)
    },

    get toolComponent() {
      return FreehandLineComponent
    },

    get closeDistance() {
      return Math.ceil(10 / self.scale)
    },

    get isCloseToStart() {
      if (self.dragPoint && self.closePoint) {
        return self.pointDistance(self.dragPoint, self.closePoint) < self.closeDistance
      }
      return false
    },

    pointDistance(p1, p2) {
      return self.getDistance(p1.x, p1.y, p2.x, p2.y)
    },

    findClosestPathPointIndex({ x, y }) {
      const distances = self.points.map(point => self.pointDistance({ x: x, y: y }, point))
      const minDistance = Math.min(...distances)
      return distances.indexOf(minDistance)
    },

    get visiblePathsRender() {
      // There are up to 3 paths
      // 1) Start point to splice start/end
      // 2) Splice start/end to end point
      // 3) Splice start to splice drag

      let paths = []

      if (self.spliceActive) {
        if (self.spliceThroughBeginning) {
          // Because it's closed we can draw 1 path
          let startIndex = (self.spliceReverse)
            ? self.spliceDragPointIndex
            : self.spliceClosePointIndex
          let endIndex = (self.spliceReverse)
            ? self.spliceClosePointIndex
            : self.spliceDragPointIndex

          paths.push(self.points.slice(startIndex, endIndex + 1))
        } else {
          // Scenarion #1 and #2
          let endIndex = (self.spliceReverse)
            ? self.spliceClosePointIndex
            : self.spliceDragPointIndex

          paths.push(self.points.slice(0, endIndex + 1))

          let startIndex = (self.spliceReverse)
            ? self.spliceDragPointIndex
            : self.spliceClosePointIndex

          paths.push(self.points.slice(startIndex, self.points.length))
        }
      } else {
        paths.push(self.points)
      }

      paths.push(self.splicePoints)

      return paths
    },

    get splicePathRender() {
      // Dashed line path when splicing
      if (!self.spliceActive) {
        return []
      }

      let pnts = []
      let startIndex = (self.spliceReverse)
        ? self.spliceClosePointIndex
        : self.spliceDragPointIndex
      let endIndex = (self.spliceReverse)
        ? self.spliceDragPointIndex
        : self.spliceClosePointIndex

      if (self.spliceThroughBeginning) {
        pnts = pnts.concat(self.points.slice(endIndex, self.points.length))
        pnts = pnts.concat(self.points.slice(0, startIndex + 1))
      } else {
        pnts = pnts.concat(self.points.slice(startIndex, endIndex + 1))
      }

      return pnts
    },

    get toData() {
      return {
        scale: self.scale,
        points: self.points,
        dragPoint: self.dragPoint,
        closePoint: self.closePoint,
        pathIsClosed: self.pathIsClosed,
        isDragging: self.isDragging,

        spliceActive: self.spliceActive,
        spliceReverse: self.spliceReverse,
        spliceThroughBeginning: self.spliceThroughBeginning,
        spliceDragPointIndex: self.spliceDragPointIndex,
        spliceClosePointIndex: self.spliceClosePointIndex,
        splicePoints: self.splicePoints,

        drawActions: self.drawActions,
        redoActions: self.redoActions,
      }
    }
  }))
  .volatile(self => ({
    scale: types.number,
    lineResolution: types.optional(types.number, 0.5),
    minimumPoints: types.optional(types.number, 20),
    undoActionPointThreshold: types.optional(types.number, 20),

    points: types.array(SingleCoord),
    dragPoint: types.maybeNull(SingleCoord),
    closePoint: types.maybeNull(SingleCoord),
    pathIsClosed: types.boolean,
    isDragging: false,

    spliceActive: types.boolean,
    spliceReverse: types.boolean,
    spliceThroughBeginning: types.boolean,
    spliceDragPointIndex: types.maybeNull(types.number),
    spliceClosePointIndex: types.maybeNull(types.number),
    splicePoints: types.array(SingleCoord),

    drawActions: types.array(ActionType),
    redoActions: types.array(ActionType),
  }))
  .actions((self) => ({
    initialize(points = []) {
      self.scale = 1
      self.lineResolution = isNaN(self.lineResolution) ? 0.5 : self.lineResolution
      self.minimumPoints = isNaN(self.minimumPoints) ? 20 : self.minimumPoints
      self.undoActionPointThreshold = isNaN(self.undoActionPointThreshold) ? 20 : self.undoActionPointThreshold
      self.pathIsClosed = false
    	self.points = [...points]

      self.setClosePoint(self.points.at(0))
      self.setDragPoint(self.points.at(-1))

      if (self.isCloseToStart && self.points.length > self.minimumPoints) {
        self.setClosePoint(null)
        self.setDragPoint(null)
        self.pathIsClosed = true
      }

      self.splicePoints = []
      self.spliceDragPointIndex = null
      self.spliceClosePointIndex = null
      self.spliceActive = false
      self.spliceReverse = false
      self.spliceThroughBeginning = false

      self.drawActions = []
      self.redoActions = []
    },

    setDragPoint(point) {
      self.dragPoint = point
    },

    setClosePoint(point) {
      self.closePoint = point
    },

    setScale(scale) {
      self.scale = scale
    },

    setLineResolution(lineResolution) {
      self.lineResolution = lineResolution
    },

    setMinimumPoints(minimumPoints) {
      self.minimumPoints = minimumPoints
    },

    setUndoActionPointThreshold(undoActionPointThreshold) {
      self.undoActionPointThreshold = undoActionPointThreshold
    },

    initialPosition(event) {
      self.initialize([{ x: event.x, y: event.y }])
      self.appendPathStart()
    },

    initialDrag(point) {
      self.appendPath(point)
    },

    close() {
      self.closePath()
    },

    appendPathStart() {
      self.isDragging = true

      self.drawActions.push({
        type: (self.spliceActive) ? 'splice-append' : 'append',
        pointIndexDrag: self.spliceDragPointIndex,
        pointIndexClose: self.spliceClosePointIndex,
        pointsFromDrag: [],
        pointsFromClose: [],
        pointsSpliceCount: 0,
        isReversed: self.spliceReverse,
        throughBeginning: self.spliceThroughBeginning
      })

      // Helps with where to set the dragPoint
      if (self.spliceActive && self.splicePoints.length == 0) {
        self.splicePoints = [self.points[self.spliceDragPointIndex]]
      }

      self.redoActionsClear()
    },

    appendPath({ x, y }) {
      if (!self.isDragging) return

      const pathPoints = (self.spliceActive)
        ? self.splicePoints
        : self.points
      const newPoint = { x: x, y: y }

      if (self.pointDistance(newPoint, pathPoints.at(-1)) < self.lineResolution) {
        return
      }

      pathPoints.push(newPoint)

      // Create new undo-able action 
      if (self.drawActions.at(-1).pointsFromDrag.length > self.undoActionPointThreshold) {
        self.appendPathStart()
      }

      self.drawActions.at(-1).pointsFromDrag.push(newPoint)
      self.setDragPoint(newPoint)

      if (self.isCloseToStart && (self.spliceActive || (!self.spliceActive && self.points.length > self.minimumPoints))) {
        self.isDragging = false
        self.closePath()
      }
    },

    appendPathEnd() {
      self.isDragging = false
      if (self.drawActions.at(-1).pointsFromDrag.length == 0) {
        self.drawActions.pop()
      }
    },

    closePath() {
      if (!self.spliceActive) {
        self.drawActions.push({
          type: 'end',
          pointIndexDrag: -1,
          pointIndexClose: -1,
          pointsFromDrag: [
            {
              x: self.points.at(0).x,
              y: self.points.at(0).y
            }
          ],
          pointsFromClose: [],
          pointsSpliceCount: 0,
          isReversed: false,
          throughBeginning: false
        })
        self.points.push(self.points.at(0))
        self.setDragPoint(null)
        self.setClosePoint(null)
        self.pathIsClosed = true
      } else {
        let spliceEndAction = self.closeSplice()
        self.drawActions.push(spliceEndAction)
      }
    },

    closeSplice() {
      // remove our splice starting point 
      self.splicePoints.shift()

      let closeSpliceAction = {
        type: 'splice-end',
        pointIndexDrag: self.spliceDragPointIndex,
        pointIndexClose: self.spliceClosePointIndex,
        pointsFromDrag: [],
        pointsFromClose: [],
        pointsSpliceCount: self.splicePoints.length,
        isReversed: self.spliceReverse,
        throughBeginning: self.spliceThroughBeginning,
      }

      let startIndex = (self.spliceReverse)
        ? self.spliceClosePointIndex
        : self.spliceDragPointIndex
      let endIndex = (self.spliceReverse)
        ? self.spliceDragPointIndex
        : self.spliceClosePointIndex

      // we don't want to remove the start index but everything in between
      startIndex++

      if (self.spliceThroughBeginning) {
        // When we remove our spliced points we start the path at the lowest-indexed end
        if (self.spliceReverse) self.splicePoints = self.splicePoints.reverse()
        self.splicePoints.push(self.points.at(endIndex))

        closeSpliceAction.pointsFromClose = closeSpliceAction.pointsFromClose.concat(self.points.slice(startIndex, self.points.length))
        closeSpliceAction.pointsFromDrag = closeSpliceAction.pointsFromDrag.concat(self.points.slice(0, endIndex))

        self.points.splice(startIndex, self.points.length - startIndex)
        self.points.splice(0, endIndex)
        self.points.splice(self.points.length, 0, ...self.splicePoints)
      } else {
        closeSpliceAction.pointsFromDrag = closeSpliceAction.pointsFromDrag.concat(self.points.slice(startIndex, endIndex))

        if (self.spliceReverse) {
          self.splicePoints = self.splicePoints.reverse()
        }

        self.points.splice(startIndex, endIndex - startIndex, ...self.splicePoints)
      }

      self.spliceReset()
      self.setDragPoint(self.pathIsClosed ? null : self.points.at(-1))
      self.setClosePoint(self.pathIsClosed ? null : self.points.at(0))

      return closeSpliceAction
    },

    undo() {
      if (self.drawActions.length == 0) {
        // remove a mark that was created, not loaded
        if (self.points.length == 1) {
          self.finish()
        }
        return
      }
      const action = toJS(self.drawActions.at(-1))

      if (action.type == 'start') {
        self.drawActions.pop()
        self.tool.deleteMark(self)
      } else if (action.type == 'end') {
        self.points.pop()
        self.setDragPoint(self.points.at(-1))
        self.setClosePoint(self.points.at(0))
        self.drawActions.pop()
      } else if (action.type == 'append') {
        let indexStart = self.points.length - action.pointsFromDrag.length
        self.points.splice(indexStart, action.pointsFromDrag.length)
        self.setDragPoint(self.points.at(-1))
        self.drawActions.pop()
      } else if (action.type == 'splice-drag-point') {
        self.spliceDragPointIndex = null
        self.setDragPoint((self.pathIsClosed) ? null : self.points.at(-1))
        self.setClosePoint((self.pathIsClosed) ? null : self.points.at(0))
        self.drawActions.pop()
      } else if (action.type == 'splice-close-point') {
        self.splicePoints.length = 0
        self.setClosePoint(null)
        self.spliceReverse = false
        self.spliceThroughBeginning = false
        self.spliceActive = false
        self.spliceClosePointIndex = null
        self.drawActions.pop()
      } else if (action.type == 'splice-append') {
        let indexStart = self.splicePoints.length - action.pointsFromDrag.length
        self.splicePoints.splice(indexStart, action.pointsFromDrag.length)
        self.setDragPoint(self.splicePoints.at(-1))
        self.drawActions.pop()
      } else if (action.type == 'splice-end') {
        if (action.throughBeginning) {
          let spliceIndex = Math.abs(action.pointIndexDrag - action.pointIndexClose)

          self.splicePoints = self.splicePoints.concat(self.points.slice(spliceIndex, self.points.length - 1));

          if (action.isReversed) {
            self.splicePoints = self.splicePoints.reverse()
          }

          // we add 1 because we don't splice out either drag/close point
          self.points.splice(spliceIndex + 1, self.points.length - spliceIndex, ...action.pointsFromClose)
          self.points.splice(0, 0, ...action.pointsFromDrag)
        } else {
          let spliceIndex = (action.isReversed)
            ? action.pointIndexClose
            : action.pointIndexDrag

          self.splicePoints = self.splicePoints.concat(self.points.slice(spliceIndex, (spliceIndex + action.pointsSpliceCount + 1)));

          if (action.isReversed) {
            self.splicePoints = self.splicePoints.reverse()
          }

          // we add 1 because we don't splice out either drag/close point
          self.points.splice(spliceIndex + 1, action.pointsSpliceCount, ...action.pointsFromDrag)
        }
        self.spliceActive = true
        self.spliceReverse = action.isReversed
        self.spliceThroughBeginning = action.throughBeginning
        self.spliceDragPointIndex = action.pointIndexDrag
        self.spliceClosePointIndex = action.pointIndexClose

        self.setDragPoint(self.splicePoints.at(-1))
        self.setClosePoint(self.points[self.spliceClosePointIndex])

        self.drawActions.pop()
      }

      self.redoActions.push(action)
    },

    redo() {
      if (self.redoActions.length == 0) return

      const action = toJS(self.redoActions.at(-1))

      if (action.type == 'end') {
        self.closePath()
      } else if (action.type == 'append') {
        self.points.splice(self.points.length, 0, ...action.pointsFromDrag)
        self.setDragPoint(self.points.at(-1))
        self.drawActions.push(action)
      } else if (action.type == 'splice-drag-point') {
        self.spliceDragPointIndex = action.pointIndexDrag
        self.setDragPoint(self.points[action.pointIndexDrag])
        self.setClosePoint(null)
        self.drawActions.push(action)
      } else if (action.type == 'splice-close-point') {
        self.setClosePoint(self.points[action.pointIndexDrag])
        self.drawActions.push(action)
        self.splicePathSetup()
      } else if (action.type == 'splice-append') {
        // complement the redo of appendPathStart
        if (self.splicePoints.length == 0) {
          self.splicePoints.push(self.dragPoint)
        }

        self.splicePoints.splice(self.splicePoints.length, 0, ...action.pointsFromDrag)
        self.setDragPoint(self.splicePoints.at(-1))
        self.drawActions.push(action)
      } else if (action.type == 'splice-end') {
        self.closeSplice()
        self.drawActions.push(action)
      }

      self.redoActions.pop()
    },

    redoActionsClear() {
      self.redoActions.length = 0
    },

    splicePathDragPoint(point) {
      if (self.spliceDragPointIndex) {
        return
      }

      let closestPointIndex = self.findClosestPathPointIndex(point)

      self.drawActions.push({
        type: 'splice-drag-point',
        pointIndexDrag: closestPointIndex,
        pointIndexClose: -1,
        pointsFromDrag: [],
        pointsFromClose: [],
        pointsSpliceCount: 0,
        isReversed: false,
        throughBeginning: false
      })

      self.spliceDragPointIndex = closestPointIndex
      self.setDragPoint(self.points.at(closestPointIndex))
      self.setClosePoint(null)
      self.redoActionsClear()
    },

    splicePathClosePoint(point) {
      if (!self.spliceDragPointIndex || self.spliceClosePointIndex) {
        return
      }

      // Four splicing scenarios ALWAYS choosing shortest splicing path
      // 1) Splice does path through path start going forward
      // 2) Splice does path through path start going reverse
      // 3) Splice does not pass through path start going forward
      // 4) Splice does not pass through path start going reverse 
      let dragPointIndex = self.spliceDragPointIndex
      let closePointIndex = self.findClosestPathPointIndex(point)
      let spliceSpan = Math.abs(closePointIndex - dragPointIndex)
      let spliceReverse = closePointIndex < dragPointIndex
      let spliceThroughBeginning = false

      if (self.pathIsClosed) {
        if (spliceSpan > self.points.length / 2) {
          spliceSpan = Math.abs(dragPointIndex - closePointIndex)
          spliceReverse = dragPointIndex < closePointIndex
        }

        if (spliceReverse && dragPointIndex < spliceSpan) {
          spliceThroughBeginning = true
        } else if (!spliceReverse && (dragPointIndex + spliceSpan) > self.points.length) {
          spliceThroughBeginning = true
        }
      }

      self.drawActions.push({
        type: 'splice-close-point',
        pointIndexDrag: dragPointIndex,
        pointIndexClose: closePointIndex,
        pointsFromDrag: [],
        pointsFromClose: [],
        pointsSpliceCount: 0,
        isReversed: spliceReverse,
        throughBeginning: spliceThroughBeginning
      })

      self.splicePathSetup()
      self.redoActionsClear()
    },

    splicePathSetup() {
      // for purposes of undo/redo we use the action to set these properties
      const action = self.drawActions.at(-1)
      self.spliceClosePointIndex = action.pointIndexClose
      self.spliceReverse = action.isReversed
      self.spliceThroughBeginning = action.throughBeginning
      self.spliceActive = true
      self.setClosePoint(self.points[action.pointIndexClose])
    },

    spliceReset() {
      self.splicePoints.length = 0
      self.spliceActive = false
      self.spliceReverse = false
      self.spliceThroughBeginning = false
      self.spliceDragPointIndex = null
      self.spliceClosePointIndex = null
    },

    move() {
      // do nothing... tool required but not used in this context
    },

    inactive() {
      if (self.drawActions.length === 0) return // comes up in stories

      while (['splice-drag-point', 'splice-close-point', 'splice-append'].indexOf(self.drawActions.at(-1).type) > -1) {
        self.undo()
        self.redoActionsClear()
      }
    },

    finish() {
      if (self.points.length < self.minimumPoints) {
        return self.tool.deleteMark(self)
      }

      if (self.isDragging) {
        self.appendPathEnd()
        self.finished = true
      } else {
        self.pathX = []
        self.pathY = []
        self.points.forEach(point => {
          self.pathX.push(point.x)
          self.pathY.push(point.y)
        })
      }
    },
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
