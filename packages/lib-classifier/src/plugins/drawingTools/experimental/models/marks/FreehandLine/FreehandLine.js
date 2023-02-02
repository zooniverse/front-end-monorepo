import { getParentOfType, types } from 'mobx-state-tree'
import { FreehandLine as FreehandLineComponent } from '@plugins/drawingTools/components/'
import { Mark } from '@plugins/drawingTools/models/marks'
import { FreehandLineTool } from '@plugins/drawingTools/models/tools'
import { FixedNumber } from '@plugins/drawingTools/types/'
import { action, toJS } from 'mobx'

const LINE_RESOLUTION = 0.5
const MINIMUM_POINTS = 20
const CLOSE_DISTANCE = 10

const SingleCoord = types.model('SingleCoord', {
  x: FixedNumber,
  y: FixedNumber
})

const actions = [];

const ActionCoor = types.model('ActionCoor', {
  0: types.number,
  1: types.number
});

const ActionType = types.model('ActionType', {
  type: types.string,
  points: types.array(ActionCoor),
  pointIndex: types.number,
  isReversed: types.boolean,
});

const FreehandLineModel = types
  .model('FreehandLineModel', {
    pathX: types.array(FixedNumber),
    pathY: types.array(FixedNumber),
    drawActions: types.array(ActionType),
    redoActions: types.array(ActionType),
  })
  .views((self) => ({
    get coords() {
      const [x] = self.pathX
      const [y] = self.pathY
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
        return dist < CLOSE_DISTANCE
      }
      return false
    },

    // this determines if drawing point is close to initial point
    get isCloseToStart() {
      const { dragPoint, targetPoint } = self
      if (dragPoint && targetPoint) {
        const dist = self.getDistance(dragPoint.x, dragPoint.y, targetPoint.x, targetPoint.y)
        return dist < CLOSE_DISTANCE
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
    targetPoint: types.maybeNull(SingleCoord),
  }))
  .actions((self) => ({
    initialPosition({ x, y }) {
      // START PATH
      self.drawActions.push({
        type: 'start',
        points: [{ 0: x, 1: y }],
        pointIndex: -1,
        isReversed: false
      });
      self.pathX.push(x)
      self.pathY.push(y)
      self.dragPoint = null
      self.targetPoint = null
      self.clipPath = []
    },

    initialDrag({ x, y }) {
      // DRAG PATH FROM START
      const dist = self.getDistance(x, y, self.lastPoint.x, self.lastPoint.y)
      if (dist > LINE_RESOLUTION && ((self.isValid && !self.isClosed) || !self.isValid)) {
        let action = self.drawActions[self.drawActions.length - 1]
        action.points.push({ 0: x, 1: y });
        self.pathX.push(x)
        self.pathY.push(y)
      }
      if (self.isValid && self.isClosed) {
        self.clipPath = []
      }
    },

    finish({ x, y }) {
      console.log('FINISH()')
      // DRAG PATH END START
      self.finished = true

      if (!self.isValid) {
        self.drawActions.pop();
        self.tool.deleteMark(self)
      }
    },

    close() {
      let {x, y} = self.initialPoint
      console.log('close()', x, y)
      self.drawActions.push({
        type: 'end',
        points: [{ 0: x, 1: y }],
        pointIndex: -1,
        isReversed: false
      });
      self.pathX.push(x)
      self.pathY.push(y)
      self.dragPoint = null
      self.targetPoint = null
      self.clipPath = []
	  },

    initialize(points) {
      if (!points) return;

      self.pathX = points.map(({ x, y }) => x)
      self.pathY = points.map(({ x, y }) => y)
      self.dragPoint = null
      self.targetPoint = null
      self.originalPath = [];
      self.clipPath = [];
    },

    setCoordinates(points) {
      // TODO: this causes a re-render state issue when clicking out of editing splice mode after you've picked your 
      // start point and your end point
      self.pathX = points.map(({ x, y }) => x)
      self.pathY = points.map(({ x, y }) => y)
    },

    move() {
      return
    },

    appendPathStart({ x, y }) {
      self.drawActions.push({
        type: 'append',
        points: [],
        pointIndex: -1,
        isReversed: false
      });
    },

    appendPath({ x, y }) {
      // Append points to current path
      const dist = self.getDistance(x, y, self.lastPoint.x, self.lastPoint.y)
      if (dist > LINE_RESOLUTION && !self.isClosed) {
        let action = self.drawActions[self.drawActions.length - 1]
        action.points.push({ 0: x, 1: y });
        self.pathX.push(x)
        self.pathY.push(y)
      }
      if (self.isClosed) {
        self.clipPath = []
      }
    },

    appendPathEnd({ x, y }) {
      let action = self.drawActions[self.drawActions.length - 1]
      if (action.points.length == 0) {
        self.drawActions.pop();
      }
    },

    splicePathStart({ x, y }) {
      self.drawActions.push({
        type: 'splice-append',
        points: [],
        pointIndex: self.points.indexOf(self.dragPoint),
        isReversed: false
      });
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

        let action = self.drawActions[self.drawActions.length - 1];
        action.points.push({ 0: x, 1: y });
        
        if (self.isCloseToStart) {
          self.clipPath = []
        }
      }
    },

    splicePathEnd({ x, y }) {
      let action = self.drawActions[self.drawActions.length - 1]
      if (action.points.length == 0) {
        self.drawActions.pop();
      }

    },

    cancelClipPath() {
      // Undo all actions up to splice start
      self.setCoordinates(self.originalPath)
      for (let i = self.drawActions.length - 1; i > 0; i--) {
        if (actions[i].type == 'splice-start') {
          self.drawActions.pop();
          break;
        } else {
          self.drawActions.pop();
        }
      }

      self.setClipPath([])
    },

    cancelEditing() {
      // THIS IS BASICALLY CALLED RIGHT AWAY ON LOAD
      // we set finished = true so that the drag handle appears
      console.log('cancelEditing() called')
      //self.finished = true
    },

    cutSegment(startPoint, endPoint) {
      console.log('cutSegment', startPoint, endPoint)
      
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

      let isReversed;
      if (!spansStartPoint) {
        /*
        Segment lies entirely within the line path, so splice points
        from dragIndex to targetIndex.
        */
        isReversed = self.splice(startIndex, endIndex)
      } else {
        /*
        Segment spans the start point of a closed loop, so
        trim the ends of the line back to dragIndex and targetIndex.
        */
        isReversed = self.trim(startIndex, endIndex)
      }

      self.drawActions.push({
        type: 'splice-end',
        points: [{ 0: targetPoint.x, 1: targetPoint.y }],
        pointIndex: endIndex,
        isReversed: isReversed,
      });
    },

    revertEdits() {
      self.dragPoint = null
      self.targetPoint = null
      self.cancelClipPath()
    },

    setClipPath(points = []) {
      self.clipPath = points
    },

    setDragPoint(point) {
      if (point === null) {
        self.dragPoint = null;
      } else {
        let foundPoint = self.selectPoint(point);
        self.dragPoint = foundPoint;
        self.originalPath = self.points.map(({ x, y }) => ({ x, y }))
        self.drawActions.push({
          type: 'splice-start',
          points: [{ 0: foundPoint.x, 1: foundPoint.y }],
          pointIndex: -1,
          isReversed: false,
        });
      }
    },

    setTargetPoint(point) {
      self.targetPoint = point ? self.selectPoint(point) : null
    },

    undo() {
      if (self.drawActions.length == 0) return;
      
      let action = toJS(self.drawActions[self.drawActions.length -1]);

      if (action.type == 'start') {
        self.drawActions.pop();
        self.tool.deleteMark(self);
      } else if(action.type == 'end') {
        self.pathX.pop();
        self.pathY.pop();
        self.drawActions.pop()
      } else if (action.type == 'append') {
        let indexStart = self.pathX.length - action.points.length;
        self.pathX.splice(indexStart, action.points.length);
        self.pathY.splice(indexStart, action.points.length);
        self.drawActions.pop()
      } else if (action.type == 'splice-start') {
        self.dragPoint = null;
        self.drawActions.pop()
      } else if (action.type == 'splice-end') {
        self.targetPoint = null;
        self.clipPath = [];
        if (action.isReversed) {
          self.pathX.reverse()
          self.pathY.reverse()
        }
        self.setCoordinates(self.originalPath)
        self.drawActions.pop()
      } else if (action.type == 'splice-append') {
        self.pathX.splice(action.pointIndex + 1, action.points.length);
        self.pathY.splice(action.pointIndex + 1, action.points.length);
        self.dragPoint = self.points[action.pointIndex];
        self.drawActions.pop()
        self.dragPoint = self.points[action.pointIndex]
      }

      self.redoActions.push(action);
    },

    redo() {
      if (self.redoActions.length == 0) return;

      let action = toJS(self.redoActions[self.redoActions.length - 1])
      console.log('action', action)

      if (action.type == 'end') {
        self.close()
      } else if (action.type == 'append') {
        let length = self.points.length
        self.pathX.splice(length, 0, ...action.points.map(pnt => pnt[0]))
        self.pathY.splice(length, 0, ...action.points.map(pnt => pnt[1]))
        self.drawActions.push(action)
      } else if (action.type == 'splice-start') {
        let foundPoint = { x: action.points[0][0], y: action.points[0][1] };
        self.dragPoint = foundPoint;
        self.originalPath = self.points.map(({ x, y }) => ({ x, y }))
        self.drawActions.push(action)
      } else if (action.type == 'splice-end') {
        let sp = self.drawActions[self.drawActions.length - 1].points[0]
        let ep = action.points[0]
        self.cutSegment({ x: sp[0], y: sp[1]}, { x: ep[0], y: ep[1] });
      } else if (action.type == 'splice-append') {
        const dragIndex = self.points.indexOf(self.dragPoint)
        const nextPoint = dragIndex + 1
        self.pathX.splice(nextPoint, 0, ...action.points.map(pnt => pnt[0]))
        self.pathY.splice(nextPoint, 0, ...action.points.map(pnt => pnt[1]))
        self.dragPoint = self.points[nextPoint + action.points.length - 1]
        self.drawActions.push(action)
        if (self.isCloseToStart) {
          self.clipPath = []
          self.dragPoint = self.lastPoint
        }
      }

      self.redoActions.pop()
    },

    redoClear() {
      self.redoActions.length = 0;
    },

    splice(startIndex, endIndex) {
      let firstPoint = Math.min(startIndex, endIndex)
      let lastPoint = Math.max(startIndex, endIndex)
      let isReversed = false
      /*
        Reverse the path, if necessary, so that the first point clicked
        is always the draggable point.
      */
      if (firstPoint === endIndex) {
        isReversed = true
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
      return isReversed
    },

    trim(startIndex, endIndex) {
      let firstPoint = Math.min(startIndex, endIndex)
      let lastPoint = Math.max(startIndex, endIndex)
      let isReversed = false
      /*
        Reverse the path, if necessary, so that the first point clicked
        is always at the end of the new line. The end of an open line
        is the draggable point.
      */
      if (lastPoint === endIndex) {
        isReversed = true
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
      return isReversed
    }
  }))

const FreehandLine = types.compose('FreehandLine', Mark, FreehandLineModel)

export default FreehandLine
