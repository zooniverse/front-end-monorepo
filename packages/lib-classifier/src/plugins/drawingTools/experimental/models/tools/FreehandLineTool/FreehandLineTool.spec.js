import FreehandLineTool from './FreehandLineTool'

const markDataOpen = {
  frame: 0,
  id: "clewjkjz800033b6bz45c3uq7",
  toolIndex: 0
}

const markDataClosed = {
  frame: 0,
  id: "clewjkjz800033b6bz45c3uq7",
  toolIndex: 0
}

const toolData = {
  type: 'freehandLine'
}

const dragIndex = 3
const dragIndexFail = 4
const dragIndexThroughBeginning = 13
const dragIndexThroughBeginningReverse = 1
const closeIndexForward = 4
const closeIndexReverse = 2
const closeIndexFail = 5
const closeIndexThroughBeginning = 1
const closeIndexThroughBeginningReverse = 11

const points = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 125, y: 100 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 200, y: 125 },
  { x: 201, y: 101 },
]

const pointsOpen = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 125, y: 100 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
]

const appendForward = [
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 }, // will close
]

const pointsAppendForward = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 200, y: 125 },
  { x: 201, y: 101 }
]

const pointsOpenAppendForward = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
]

const appendReverse = [
  { x: 135, y: 100 },
  { x: 135, y: 85 },
  { x: 145, y: 80 }, // will close
]

const pointsAppendForwardReverse = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 145, y: 80 },
  { x: 135, y: 85 },
  { x: 135, y: 100 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 200, y: 125 },
  { x: 201, y: 101 },
]

const pointsOpenAppendForwardReverse = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 145, y: 80 },
  { x: 135, y: 85 },
  { x: 135, y: 100 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
]

const pointsOpenAppendForwardReverseClose = [
  { x: 200, y: 100 },
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 145, y: 80 },
  { x: 135, y: 85 },
  { x: 135, y: 100 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 200, y: 125 },
  { x: 201, y: 101 },
  { x: 200, y: 100 }
]

// 13 (175,150) => 1 (175,75)
const appendThroughBeginning = [
  { x: 175, y: 140 },
  { x: 175, y: 120 },
  { x: 175, y: 100 },
  { x: 175, y: 80 }, // will close
]

// pointsAppendForwardReverse gets 0, 14, 15 cut
const pointsAppendForwardReverseThroughBeginning = [
  { x: 175, y: 75 },
  { x: 150, y: 75 },
  { x: 145, y: 80 },
  { x: 135, y: 85 },
  { x: 135, y: 100 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 175, y: 140 },
  { x: 175, y: 120 },
  { x: 175, y: 100 },
  { x: 175, y: 80 },
  { x: 175, y: 75 },
]

// 1 (150,75) => 11 (150,150)
const appendThroughBeginningReverse = [
  { x: 150, y: 85 },
  { x: 150, y: 95 },
  { x: 150, y: 105 },
  { x: 150, y: 115 },
  { x: 150, y: 125 },
  { x: 150, y: 135 },
  { x: 150, y: 145 }, // will close
]

// pointsAppendForwardReverseThroughBeginning gets 0, 12-17 cut
const pointsAppendForwardReverseThroughBeginningReverse = [
  { x: 150, y: 75 },
  { x: 145, y: 80 },
  { x: 135, y: 85 },
  { x: 135, y: 100 },
  { x: 125, y: 100 },
  { x: 110, y: 100 },
  { x: 110, y: 115 },
  { x: 110, y: 125 },
  { x: 120, y: 125 },
  { x: 125, y: 125 },
  { x: 150, y: 150 },
  { x: 150, y: 145 },
  { x: 150, y: 135 },
  { x: 150, y: 125 },
  { x: 150, y: 115 },
  { x: 150, y: 105 },
  { x: 150, y: 95 },
  { x: 150, y: 85 },
  { x: 150, y: 75 },
]

describe('FreehandLineTool', () => {
  let tool

  before(() => {
    tool = FreehandLineTool.create(toolData)
  })

  it('should exist', () => {
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  it('should create a valid mark', () => {
    expect(tool.marks.size).to.equal(0)
    tool.createMark(markDataClosed, points)
    expect(tool.marks.size).to.equal(1)
  })

  describe('manipulating an open mark', () => {
    let tool, mark

    before(() => {
      tool = FreehandLineTool.create(toolData)
      mark = tool.createMark(markDataOpen)
      mark.setMinimumPoints(5)
      mark.initialize(pointsOpen)
    })

    it('should be valid as open', () => {
      expect(mark.points).to.deep.equal(pointsOpen)
      expect(mark.isDragging).to.equal(false)
      expect(mark.scale).to.equal(1)
      expect(mark.closePoint).to.deep.equal(pointsOpen.at(0))
      expect(mark.dragPoint).to.deep.equal(pointsOpen.at(-1))
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(0)
      expect(mark.redoActions.length).to.equal(0)
    })

    // drag point
    it('should create splicePathDragPoint', () => {
      mark.splicePathDragPoint(pointsOpen[dragIndex])

      expect(mark.points).to.deep.equal(pointsOpen)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.deep.equal(pointsOpen[dragIndex])
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(1)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[0]
      expect(action.type).to.equal('splice-drag-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(-1)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should create splicePathClosePoint', () => {
      mark.splicePathClosePoint(pointsOpen[closeIndexForward])

      expect(mark.points).to.deep.equal(pointsOpen)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpen[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(pointsOpen[dragIndex])
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(2)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[1]

      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should start splicing with appendPathStart', () => {
      mark.appendPathStart()

      expect(mark.points).to.deep.equal(pointsOpen)
      expect(mark.isDragging).to.equal(true)
      expect(mark.closePoint).to.deep.equal(pointsOpen[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(pointsOpen[dragIndex])
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(1)
      expect(mark.splicePoints[0]).to.deep.equal(mark.points[dragIndex])
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[2]
      expect(action.type).to.equal('splice-append')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should append path with appendPath', () => {
      mark.appendPath(appendForward[0])

      expect(mark.points).to.deep.equal(pointsOpen)
      expect(mark.isDragging).to.equal(true)
      expect(mark.closePoint).to.deep.equal(pointsOpen[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(appendForward[0])
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(2)

      expect(mark.splicePoints[0]).to.deep.equal(mark.points[dragIndex])
      expect(mark.splicePoints[1]).to.deep.equal(appendForward[0])

      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[2]
      expect(action.type).to.equal('splice-append')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(1)
      expect(action.pointsFromDrag[0]).to.deep.equal(appendForward[0])
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should close the path with the rest of appendPath', () => {
      mark.appendPath(appendForward[1])
      mark.appendPath(appendForward[2])
      mark.appendPath(appendForward[3])

      expect(mark.points).to.deep.equal(pointsOpenAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpen.at(0))
      expect(mark.dragPoint).to.deep.equal(pointsOpen.at(-1))
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(4)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[3]
      expect(action.type).to.equal('splice-end')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(closeIndexForward - dragIndex - 1)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.pointsSpliceCount).to.equal(appendForward.length)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should undo and redo all actions', () => {
      for (let i = 0; i < 4; i++) {
        mark.undo()
      }
      for (let i = 0; i < 4; i++) {
        mark.redo()
      }

      expect(mark.points).to.deep.equal(pointsOpenAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpen.at(0))
      expect(mark.dragPoint).to.deep.equal(pointsOpen.at(-1))
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(4)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[3]
      expect(action.type).to.equal('splice-end')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(closeIndexForward - dragIndex - 1)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.pointsSpliceCount).to.equal(appendForward.length)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    // append path reverse on top of existing appended path
    it('should create reverse instance of splicePathDragPoint & splicePathClosePoint', () => {
      mark.splicePathDragPoint(pointsOpenAppendForward[dragIndex])
      mark.splicePathClosePoint(pointsOpenAppendForward[closeIndexReverse])

      expect(mark.points).to.deep.equal(pointsOpenAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpenAppendForward[closeIndexReverse])
      expect(mark.dragPoint).to.deep.equal(pointsOpenAppendForward[dragIndex])
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexReverse)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(true)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(6)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[4]
      expect(spliceDragPointAction.type).to.equal('splice-drag-point')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(-1)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(false)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[5]
      expect(spliceClosePointAction.type).to.equal('splice-close-point')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should appendPath and appendPathEnd for reverse instance', () => {
      mark.appendPathStart()
      mark.appendPath(appendReverse[0])
      mark.appendPath(appendReverse[1])
      mark.appendPath(appendReverse[2])

      expect(mark.points.length).to.equal(pointsOpenAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsOpenAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpen.at(0))
      expect(mark.dragPoint).to.deep.equal(pointsOpen.at(-1))
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(8)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[6]
      expect(spliceDragPointAction.type).to.equal('splice-append')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(appendReverse.length)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(true)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[7]
      expect(spliceClosePointAction.type).to.equal('splice-end')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(appendReverse.length)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should undo/redo all actions for reverse instance', () => {
      for (let i = 0; i < 8; i++) {
        mark.undo()
      }
      for (let i = 0; i < 8; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsOpenAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsOpenAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsOpen.at(0))
      expect(mark.dragPoint).to.deep.equal(pointsOpen.at(-1))
      expect(mark.pathIsClosed).to.equal(false)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(8)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[6]
      expect(spliceDragPointAction.type).to.equal('splice-append')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(appendReverse.length)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(true)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[7]
      expect(spliceClosePointAction.type).to.equal('splice-end')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(appendReverse.length)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should close the path instance', () => {
      mark.appendPathStart()
      mark.appendPath(points[7])
      mark.appendPath(points[8])

      expect(mark.points.length).to.equal(pointsOpenAppendForwardReverseClose.length)
      expect(mark.points).to.deep.equal(pointsOpenAppendForwardReverseClose)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(10)
      expect(mark.redoActions.length).to.equal(0)

      let appendAction = mark.drawActions[8]
      expect(appendAction.type).to.equal('append')
      expect(appendAction.pointIndexDrag).to.equal(null)
      expect(appendAction.pointIndexClose).to.equal(null)
      expect(appendAction.pointsFromDrag.length).to.equal(2)
      expect(appendAction.pointsFromDrag[0]).to.deep.equal(points[7])
      expect(appendAction.pointsFromDrag[1]).to.deep.equal(points[8])
      expect(appendAction.pointsFromClose.length).to.equal(0)
      expect(appendAction.isReversed).to.equal(false)
      expect(appendAction.throughBeginning).to.equal(false)

      let endAction = mark.drawActions[9]
      expect(endAction.type).to.equal('end')
      expect(endAction.pointIndexDrag).to.equal(-1)
      expect(endAction.pointIndexClose).to.equal(-1)
      expect(endAction.pointsFromDrag.length).to.equal(1)
      expect(endAction.pointsFromDrag[0]).to.deep.equal(pointsOpenAppendForwardReverseClose[0])
      expect(endAction.pointsFromClose.length).to.equal(0)
      expect(endAction.pointsSpliceCount).to.equal(0)
      expect(endAction.isReversed).to.equal(false)
      expect(endAction.throughBeginning).to.equal(false)
    })

    it('should undo/redo the complete path instance', () => {
      for (let i = 0; i < 10; i++) {
        mark.undo()
      }
      for (let i = 0; i < 10; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsOpenAppendForwardReverseClose.length)
      expect(mark.points).to.deep.equal(pointsOpenAppendForwardReverseClose)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(10)
      expect(mark.redoActions.length).to.equal(0)

      let appendAction = mark.drawActions[8]
      expect(appendAction.type).to.equal('append')
      expect(appendAction.pointIndexDrag).to.equal(null)
      expect(appendAction.pointIndexClose).to.equal(null)
      expect(appendAction.pointsFromDrag.length).to.equal(2)
      expect(appendAction.pointsFromDrag[0]).to.deep.equal(points[7])
      expect(appendAction.pointsFromDrag[1]).to.deep.equal(points[8])
      expect(appendAction.pointsFromClose.length).to.equal(0)
      expect(appendAction.isReversed).to.equal(false)
      expect(appendAction.throughBeginning).to.equal(false)

      let endAction = mark.drawActions[9]
      expect(endAction.type).to.equal('end')
      expect(endAction.pointIndexDrag).to.equal(-1)
      expect(endAction.pointIndexClose).to.equal(-1)
      expect(endAction.pointsFromDrag.length).to.equal(1)
      expect(endAction.pointsFromDrag[0]).to.deep.equal(pointsOpenAppendForwardReverseClose[0])
      expect(endAction.pointsFromClose.length).to.equal(0)
      expect(endAction.pointsSpliceCount).to.equal(0)
      expect(endAction.isReversed).to.equal(false)
      expect(endAction.throughBeginning).to.equal(false)
    })
  })

  describe('manipulating a closed mark', () => {
    let tool, mark

    before(() => {
      tool = FreehandLineTool.create(toolData)
      mark = tool.createMark(markDataClosed)
      mark.setMinimumPoints(5)
      mark.initialize(points)
    })

    it('should be valid as closed', () => {
      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.scale).to.equal(1)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(0)
      expect(mark.redoActions.length).to.equal(0)
    })

    // drag point
    it('should create splicePathDragPoint', () => {
      mark.splicePathDragPoint(points[dragIndex])

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(1)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[0]
      expect(action.type).to.equal('splice-drag-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(-1)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should not create a second splicePathDragPoint', () => {
      mark.splicePathDragPoint(points[dragIndexFail])

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.not.deep.equal(points[dragIndexFail])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.not.equal(dragIndexFail)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(1)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[0]
      expect(action.type).to.equal('splice-drag-point')
      expect(action.pointIndexDrag).to.not.equal(dragIndexFail)
      expect(action.pointIndexClose).to.equal(-1)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should undo splicePathDragPoint', () => {
      mark.undo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(0)
      expect(mark.redoActions.length).to.equal(1)

      let action = mark.redoActions[0]
      expect(action.type).to.equal('splice-drag-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(-1)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should redo splicePathDragPoint', () => {
      mark.redo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(1)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[0]
      expect(action.type).to.equal('splice-drag-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(-1)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    // close point
    it('should create splicePathClosePoint', () => {
      mark.splicePathClosePoint(points[closeIndexForward])

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(2)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[1]

      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should not create a second splicePathClosePoint', () => {
      mark.splicePathClosePoint(points[closeIndexFail])

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.not.equal(points[closeIndexFail])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.not.equal(closeIndexFail)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(2)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[1]
      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.not.equal(closeIndexFail)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should undo splicePathClosePoint', () => {
      mark.undo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(1)
      expect(mark.redoActions.length).to.equal(1)

      let action = mark.redoActions[0]
      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should redo splicePathClosePoint', () => {
      mark.redo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(2)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[1]
      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    // append path
    it('should start splicing with appendPathStart', () => {
      mark.appendPathStart()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(true)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(1)
      expect(mark.splicePoints[0]).to.deep.equal(mark.points[dragIndex])
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[2]
      expect(action.type).to.equal('splice-append')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should append path with appendPath', () => {
      mark.appendPath(appendForward[0])

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(true)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(appendForward[0])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(2)

      expect(mark.splicePoints[0]).to.deep.equal(mark.points[dragIndex])
      expect(mark.splicePoints[1]).to.deep.equal(appendForward[0])

      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[2]
      expect(action.type).to.equal('splice-append')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(1)
      expect(action.pointsFromDrag[0]).to.deep.equal(appendForward[0])
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should close the path with the rest of appendPath', () => {
      mark.appendPath(appendForward[1])
      mark.appendPath(appendForward[2])
      mark.appendPath(appendForward[3])

      expect(mark.points).to.deep.equal(pointsAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(4)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[3]
      expect(action.type).to.equal('splice-end')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(closeIndexForward - dragIndex - 1)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.pointsSpliceCount).to.equal(appendForward.length)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    it('should undo closePath', () => {
      mark.undo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(appendForward[3])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(appendForward.length + 1)

      expect(mark.splicePoints[0]).to.deep.equal(mark.points[dragIndex])
      expect(mark.splicePoints[1]).to.deep.equal(appendForward[0])

      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(1)

      let action = mark.drawActions[2]
      expect(action.type).to.equal('splice-append')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(appendForward.length)
      expect(action.pointsFromDrag).to.deep.equal(appendForward)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)

      let redoAction = mark.redoActions[0]
      expect(redoAction.type).to.equal('splice-end')
      expect(redoAction.pointIndexDrag).to.equal(dragIndex)
      expect(redoAction.pointIndexClose).to.equal(closeIndexForward)
      expect(redoAction.pointsFromDrag.length).to.equal(closeIndexForward - dragIndex - 1)
      expect(redoAction.pointsFromClose.length).to.equal(0)
      expect(redoAction.isReversed).to.equal(false)
      expect(redoAction.throughBeginning).to.equal(false)
    })

    it('should undo appendPath', () => {
      mark.undo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(1)
      expect(mark.splicePoints[0]).to.deep.equal(points[dragIndex])
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(2)
      expect(mark.redoActions.length).to.equal(2)

      let action = mark.drawActions[1]
      expect(action.type).to.equal('splice-close-point')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(0)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)

      let redoActionEnd = mark.redoActions[0]
      expect(redoActionEnd.type).to.equal('splice-end')
      expect(redoActionEnd.pointIndexDrag).to.equal(dragIndex)
      expect(redoActionEnd.pointIndexClose).to.equal(closeIndexForward)
      expect(redoActionEnd.pointsFromDrag.length).to.equal(0)
      expect(redoActionEnd.pointsFromClose.length).to.equal(0)
      expect(redoActionEnd.isReversed).to.equal(false)
      expect(redoActionEnd.throughBeginning).to.equal(false)

      let redoActionAppend = mark.redoActions[1]
      expect(redoActionAppend.type).to.equal('splice-append')
      expect(redoActionAppend.pointIndexDrag).to.equal(dragIndex)
      expect(redoActionAppend.pointIndexClose).to.equal(closeIndexForward)
      expect(redoActionAppend.pointsFromDrag.length).to.equal(appendForward.length)
      expect(redoActionAppend.pointsFromDrag).to.deep.equal(appendForward)
      expect(redoActionAppend.pointsFromClose.length).to.equal(0)
      expect(redoActionAppend.isReversed).to.equal(false)
      expect(redoActionAppend.throughBeginning).to.equal(false)
    })

    it('should redo appendPath', () => {
      mark.redo()

      expect(mark.points).to.deep.equal(points)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexForward])
      expect(mark.dragPoint).to.deep.equal(appendForward[3])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(appendForward.length + 1)

      expect(mark.splicePoints[0]).to.deep.equal(points[dragIndex])
      expect(mark.splicePoints[1]).to.deep.equal(appendForward[0])
      expect(mark.splicePoints[3]).to.deep.equal(appendForward[2])

      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexForward)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(3)
      expect(mark.redoActions.length).to.equal(1)

      let redoActionAppend = mark.drawActions[2]
      expect(redoActionAppend.type).to.equal('splice-append')
      expect(redoActionAppend.pointIndexDrag).to.equal(dragIndex)
      expect(redoActionAppend.pointIndexClose).to.equal(closeIndexForward)
      expect(redoActionAppend.pointsFromDrag.length).to.equal(appendForward.length)
      expect(redoActionAppend.pointsFromDrag).to.deep.equal(appendForward)
      expect(redoActionAppend.pointsFromClose.length).to.equal(0)
      expect(redoActionAppend.isReversed).to.equal(false)
      expect(redoActionAppend.throughBeginning).to.equal(false)

      let redoActionEnd = mark.redoActions[0]
      expect(redoActionEnd.type).to.equal('splice-end')
      expect(redoActionEnd.pointIndexDrag).to.equal(dragIndex)
      expect(redoActionEnd.pointIndexClose).to.equal(closeIndexForward)
      expect(redoActionEnd.pointsFromDrag.length).to.equal(0)
      expect(redoActionEnd.pointsFromClose.length).to.equal(0)
      expect(redoActionEnd.isReversed).to.equal(false)
      expect(redoActionEnd.throughBeginning).to.equal(false)
    })

    it('should redo appendPathEnd', () => {
      mark.redo()

      expect(mark.points).to.deep.equal(pointsAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(4)
      expect(mark.redoActions.length).to.equal(0)

      let action = mark.drawActions[3]
      expect(action.type).to.equal('splice-end')
      expect(action.pointIndexDrag).to.equal(dragIndex)
      expect(action.pointIndexClose).to.equal(closeIndexForward)
      expect(action.pointsFromDrag.length).to.equal(closeIndexForward - dragIndex - 1)
      expect(action.pointsFromClose.length).to.equal(0)
      expect(action.pointsSpliceCount).to.equal(appendForward.length)
      expect(action.isReversed).to.equal(false)
      expect(action.throughBeginning).to.equal(false)
    })

    // append path reverse on top of existing appended path
    it('should create reverse instance of splicePathDragPoint & splicePathClosePoint', () => {
      mark.splicePathDragPoint(points[dragIndex])
      mark.splicePathClosePoint(points[closeIndexReverse])

      expect(mark.points).to.deep.equal(pointsAppendForward)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(points[closeIndexReverse])
      expect(mark.dragPoint).to.deep.equal(points[dragIndex])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndex)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexReverse)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(true)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(6)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[4]
      expect(spliceDragPointAction.type).to.equal('splice-drag-point')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(-1)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(false)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[5]
      expect(spliceClosePointAction.type).to.equal('splice-close-point')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should appendPath and appendPathEnd for reverse instance', () => {
      mark.appendPathStart()
      mark.appendPath(appendReverse[0])
      mark.appendPath(appendReverse[1])
      mark.appendPath(appendReverse[2])

      expect(mark.points.length).to.equal(pointsAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(8)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[6]
      expect(spliceDragPointAction.type).to.equal('splice-append')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(appendReverse.length)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(true)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[7]
      expect(spliceClosePointAction.type).to.equal('splice-end')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(appendReverse.length)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should undo and redo all of the reverse path successfully', () => {
      for (let i = 0; i < 4; i++) {
        mark.undo()
      }
      for (let i = 0; i < 4; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(8)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[6]
      expect(spliceDragPointAction.type).to.equal('splice-append')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(appendReverse.length)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(true)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[7]
      expect(spliceClosePointAction.type).to.equal('splice-end')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(appendReverse.length)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    it('should undo and redo all action successfully', () => {
      for (let i = 0; i < 8; i++) {
        mark.undo()
      }
      for (let i = 0; i < 8; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(8)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[6]
      expect(spliceDragPointAction.type).to.equal('splice-append')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceDragPointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(appendReverse.length)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(true)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[7]
      expect(spliceClosePointAction.type).to.equal('splice-end')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndex)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(appendReverse.length)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(false)
    })

    // append path through the start point
    it('should create instance of splicePathDragPoint & splicePathClosePoint through beginning', () => {
      mark.splicePathDragPoint(pointsAppendForwardReverse[dragIndexThroughBeginning])
      mark.splicePathClosePoint(pointsAppendForwardReverse[closeIndexThroughBeginning])

      expect(mark.points.length).to.equal(pointsAppendForwardReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsAppendForwardReverse[closeIndexThroughBeginning])
      expect(mark.dragPoint).to.deep.equal(pointsAppendForwardReverse[dragIndexThroughBeginning])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndexThroughBeginning)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexThroughBeginning)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(true)
      expect(mark.drawActions.length).to.equal(10)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[8]
      expect(spliceDragPointAction.type).to.equal('splice-drag-point')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceDragPointAction.pointIndexClose).to.equal(-1)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(false)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[9]
      expect(spliceClosePointAction.type).to.equal('splice-close-point')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexThroughBeginning)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(0)
      expect(spliceClosePointAction.isReversed).to.equal(false)
      expect(spliceClosePointAction.throughBeginning).to.equal(true)
    })

    it('should appendPath and appendPathEnd through beginning', () => {
      mark.appendPathStart()
      appendThroughBeginning.forEach(pnt => {
        mark.appendPath(pnt)
      })

      expect(mark.points.length).to.equal(pointsAppendForwardReverseThroughBeginning.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverseThroughBeginning)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(12)
      expect(mark.redoActions.length).to.equal(0)

      let spliceAppendAction = mark.drawActions[10]
      expect(spliceAppendAction.type).to.equal('splice-append')
      expect(spliceAppendAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceAppendAction.pointIndexClose).to.equal(closeIndexThroughBeginning)
      expect(spliceAppendAction.pointsFromDrag.length).to.equal(appendThroughBeginning.length)
      expect(spliceAppendAction.pointsFromClose.length).to.equal(0)
      expect(spliceAppendAction.isReversed).to.equal(false)
      expect(spliceAppendAction.throughBeginning).to.equal(true)

      let spliceEndAction = mark.drawActions[11]
      expect(spliceEndAction.type).to.equal('splice-end')
      expect(spliceEndAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceEndAction.pointIndexClose).to.equal(closeIndexThroughBeginning)
      expect(spliceEndAction.pointsFromDrag.length).to.equal(1)
      expect(spliceEndAction.pointsFromDrag[0]).to.deep.equal(pointsAppendForwardReverse[0])
      expect(spliceEndAction.pointsFromClose.length).to.equal(2)
      expect(spliceEndAction.pointsFromClose[0]).to.deep.equal(pointsAppendForwardReverse[14])
      expect(spliceEndAction.pointsFromClose[1]).to.deep.equal(pointsAppendForwardReverse[15])
      expect(spliceEndAction.pointsSpliceCount).to.equal(appendThroughBeginning.length)
      expect(spliceEndAction.isReversed).to.equal(false)
      expect(spliceEndAction.throughBeginning).to.equal(true)
    })

    it('should undo/redo path through beginning successfully', () => {
      for (let i = 0; i < 4; i++) {
        mark.undo()
      }
      for (let i = 0; i < 4; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsAppendForwardReverseThroughBeginning.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverseThroughBeginning)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(12)
      expect(mark.redoActions.length).to.equal(0)

      let spliceAppendAction = mark.drawActions[10]
      expect(spliceAppendAction.type).to.equal('splice-append')
      expect(spliceAppendAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceAppendAction.pointIndexClose).to.equal(closeIndexThroughBeginning)
      expect(spliceAppendAction.pointsFromDrag.length).to.equal(appendThroughBeginning.length)
      expect(spliceAppendAction.pointsFromClose.length).to.equal(0)
      expect(spliceAppendAction.isReversed).to.equal(false)
      expect(spliceAppendAction.throughBeginning).to.equal(true)

      let spliceEndAction = mark.drawActions[11]
      expect(spliceEndAction.type).to.equal('splice-end')
      expect(spliceEndAction.pointIndexDrag).to.equal(dragIndexThroughBeginning)
      expect(spliceEndAction.pointIndexClose).to.equal(closeIndexThroughBeginning)
      expect(spliceEndAction.pointsFromDrag.length).to.equal(1)
      expect(spliceEndAction.pointsFromDrag[0]).to.deep.equal(pointsAppendForwardReverse[0])
      expect(spliceEndAction.pointsFromClose.length).to.equal(2)
      expect(spliceEndAction.pointsFromClose[0]).to.deep.equal(pointsAppendForwardReverse[14])
      expect(spliceEndAction.pointsFromClose[1]).to.deep.equal(pointsAppendForwardReverse[15])
      expect(spliceEndAction.pointsSpliceCount).to.equal(appendThroughBeginning.length)
      expect(spliceEndAction.isReversed).to.equal(false)
      expect(spliceEndAction.throughBeginning).to.equal(true)
    })

    // append path through the start point in reverse
    it('should create instance of splicePathDragPoint & splicePathClosePoint through beginning in reverse', () => {
      mark.splicePathDragPoint(pointsAppendForwardReverseThroughBeginning[dragIndexThroughBeginningReverse])
      mark.splicePathClosePoint(pointsAppendForwardReverseThroughBeginning[closeIndexThroughBeginningReverse])

      expect(mark.points.length).to.equal(pointsAppendForwardReverseThroughBeginning.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverseThroughBeginning)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.deep.equal(pointsAppendForwardReverseThroughBeginning[closeIndexThroughBeginningReverse])
      expect(mark.dragPoint).to.deep.equal(pointsAppendForwardReverseThroughBeginning[dragIndexThroughBeginningReverse])
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(dragIndexThroughBeginningReverse)
      expect(mark.spliceClosePointIndex).to.equal(closeIndexThroughBeginningReverse)
      expect(mark.spliceActive).to.equal(true)
      expect(mark.spliceReverse).to.equal(true)
      expect(mark.spliceThroughBeginning).to.equal(true)
      expect(mark.drawActions.length).to.equal(14)
      expect(mark.redoActions.length).to.equal(0)

      let spliceDragPointAction = mark.drawActions[12]
      expect(spliceDragPointAction.type).to.equal('splice-drag-point')
      expect(spliceDragPointAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceDragPointAction.pointIndexClose).to.equal(-1)
      expect(spliceDragPointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceDragPointAction.pointsFromClose.length).to.equal(0)
      expect(spliceDragPointAction.isReversed).to.equal(false)
      expect(spliceDragPointAction.throughBeginning).to.equal(false)

      let spliceClosePointAction = mark.drawActions[13]
      expect(spliceClosePointAction.type).to.equal('splice-close-point')
      expect(spliceClosePointAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceClosePointAction.pointIndexClose).to.equal(closeIndexThroughBeginningReverse)
      expect(spliceClosePointAction.pointsFromDrag.length).to.equal(0)
      expect(spliceClosePointAction.pointsFromClose.length).to.equal(0)
      expect(spliceClosePointAction.pointsSpliceCount).to.equal(0)
      expect(spliceClosePointAction.isReversed).to.equal(true)
      expect(spliceClosePointAction.throughBeginning).to.equal(true)
    })

    it('should appendPath and appendPathEnd through beginning', () => {
      mark.appendPathStart()
      appendThroughBeginningReverse.forEach(pnt => {
        mark.appendPath(pnt)
      })

      expect(mark.points.length).to.equal(pointsAppendForwardReverseThroughBeginningReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverseThroughBeginningReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(16)
      expect(mark.redoActions.length).to.equal(0)

      let spliceAppendAction = mark.drawActions[14]
      expect(spliceAppendAction.type).to.equal('splice-append')
      expect(spliceAppendAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceAppendAction.pointIndexClose).to.equal(closeIndexThroughBeginningReverse)
      expect(spliceAppendAction.pointsFromDrag.length).to.equal(appendThroughBeginningReverse.length)
      expect(spliceAppendAction.pointsFromClose.length).to.equal(0)
      expect(spliceAppendAction.isReversed).to.equal(true)
      expect(spliceAppendAction.throughBeginning).to.equal(true)

      let spliceEndAction = mark.drawActions[15]
      expect(spliceEndAction.type).to.equal('splice-end')
      expect(spliceEndAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceEndAction.pointIndexClose).to.equal(closeIndexThroughBeginningReverse)
      expect(spliceEndAction.pointsFromDrag.length).to.equal(1)
      expect(spliceEndAction.pointsFromDrag[0]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[0])
      expect(spliceEndAction.pointsFromClose.length).to.equal(6)
      expect(spliceEndAction.pointsFromClose[0]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[12])
      expect(spliceEndAction.pointsFromClose[1]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[13])
      expect(spliceEndAction.pointsFromClose[2]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[14])
      expect(spliceEndAction.pointsFromClose[3]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[15])
      expect(spliceEndAction.pointsFromClose[4]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[16])
      expect(spliceEndAction.pointsFromClose[5]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[17])
      expect(spliceEndAction.pointsSpliceCount).to.equal(appendThroughBeginningReverse.length)
      expect(spliceEndAction.isReversed).to.equal(true)
      expect(spliceEndAction.throughBeginning).to.equal(true)
    })

    it('should undo/redo path through beginning successfully', () => {
      for (let i = 0; i < 16; i++) {
        mark.undo()
      }
      for (let i = 0; i < 16; i++) {
        mark.redo()
      }

      expect(mark.points.length).to.equal(pointsAppendForwardReverseThroughBeginningReverse.length)
      expect(mark.points).to.deep.equal(pointsAppendForwardReverseThroughBeginningReverse)
      expect(mark.isDragging).to.equal(false)
      expect(mark.closePoint).to.equal(null)
      expect(mark.dragPoint).to.equal(null)
      expect(mark.pathIsClosed).to.equal(true)
      expect(mark.splicePoints.length).to.equal(0)
      expect(mark.spliceDragPointIndex).to.equal(null)
      expect(mark.spliceClosePointIndex).to.equal(null)
      expect(mark.spliceActive).to.equal(false)
      expect(mark.spliceReverse).to.equal(false)
      expect(mark.spliceThroughBeginning).to.equal(false)
      expect(mark.drawActions.length).to.equal(16)
      expect(mark.redoActions.length).to.equal(0)

      let spliceAppendAction = mark.drawActions[14]
      expect(spliceAppendAction.type).to.equal('splice-append')
      expect(spliceAppendAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceAppendAction.pointIndexClose).to.equal(closeIndexThroughBeginningReverse)
      expect(spliceAppendAction.pointsFromDrag.length).to.equal(appendThroughBeginningReverse.length)
      expect(spliceAppendAction.pointsFromClose.length).to.equal(0)
      expect(spliceAppendAction.isReversed).to.equal(true)
      expect(spliceAppendAction.throughBeginning).to.equal(true)

      let spliceEndAction = mark.drawActions[15]
      expect(spliceEndAction.type).to.equal('splice-end')
      expect(spliceEndAction.pointIndexDrag).to.equal(dragIndexThroughBeginningReverse)
      expect(spliceEndAction.pointIndexClose).to.equal(closeIndexThroughBeginningReverse)
      expect(spliceEndAction.pointsFromDrag.length).to.equal(1)
      expect(spliceEndAction.pointsFromDrag[0]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[0])
      expect(spliceEndAction.pointsFromClose.length).to.equal(6)
      expect(spliceEndAction.pointsFromClose[0]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[12])
      expect(spliceEndAction.pointsFromClose[1]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[13])
      expect(spliceEndAction.pointsFromClose[2]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[14])
      expect(spliceEndAction.pointsFromClose[3]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[15])
      expect(spliceEndAction.pointsFromClose[4]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[16])
      expect(spliceEndAction.pointsFromClose[5]).to.deep.equal(pointsAppendForwardReverseThroughBeginning[17])
      expect(spliceEndAction.pointsSpliceCount).to.equal(appendThroughBeginningReverse.length)
      expect(spliceEndAction.isReversed).to.equal(true)
      expect(spliceEndAction.throughBeginning).to.equal(true)
    })
  })
})
