import sinon from 'sinon'
import { observable } from 'mobx'
import DrawingTask from './DrawingTask'
import DrawingAnnotation from './DrawingAnnotation'
import { Line, Point } from '@plugins/drawingTools/models/marks'

const pointTool = {
  help: '',
  label: 'Point please.',
  type: 'point'
}

const lineTool = {
  help: '',
  label: 'Draw a line',
  type: 'line'
}

const drawingTaskSnapshot = {
  instruction: "Mark each cat's face and tail. Draw an ellipse around each cat's face (not including the ears), and mark the tail tip with a point.",
  taskKey: 'T3',
  tools: [pointTool, lineTool],
  type: 'drawing'
}

describe('Model > DrawingTask', function () {
  it('should exist', function () {
    const drawingTask = DrawingTask.create(drawingTaskSnapshot)
    expect(drawingTask).to.be.ok()
    expect(drawingTask).to.be.an('object')
  })

  it('should have a property `type` of `drawing`', function () {
    const drawingTask = DrawingTask.create(drawingTaskSnapshot)
    expect(drawingTask).to.include({ type: 'drawing' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => DrawingTask.create({ type: 'orange' })).to.throw()
  })

  describe('drawn marks', function () {
    let marks
    before(function () {
      const drawingTask = DrawingTask.create(drawingTaskSnapshot)
      drawingTask.tools[0].createMark({ id: 'point1' })
      drawingTask.tools[0].createMark({ id: 'point2' })
      drawingTask.tools[1].createMark({ id: 'line1' })
      marks = drawingTask.marks
    })

    it('should exist for each drawn mark', function () {
      expect(marks.length).to.equal(3)
    })
  })

  describe('on complete', function () {
    let marks
    let addAnnotation
    before(function () {
      const drawingTask = DrawingTask.create(drawingTaskSnapshot)
      const point1 = drawingTask.tools[0].createMark({ id: 'point1' })
      const point2 = drawingTask.tools[0].createMark({ id: 'point2' })
      const line1 = drawingTask.tools[1].createMark({ id: 'line1' })
      drawingTask.classifications = {
        addAnnotation: sinon.stub()
      }
      addAnnotation = drawingTask.classifications.addAnnotation.withArgs(drawingTask, [point1, point2, line1])
      drawingTask.complete()
      marks = drawingTask.marks
    })

    it('should remove marks from the task', function () {
      expect(marks).to.be.empty()
    })

    it('should copy marks to the task annotation', function () {
      expect(addAnnotation).to.have.been.calledOnce()
    })
  })

  describe('on start', function () {
    let marks
    let pointTool
    let lineTool
    let addAnnotation
    before(function () {
      const drawingTask = DrawingTask.create(drawingTaskSnapshot)
      pointTool = drawingTask.tools[0]
      lineTool = drawingTask.tools[1]
      const taskAnnotation = DrawingAnnotation.create({
        task: 'T3',
        value: [
          Point.create({ id: 'point1', toolIndex: 0 }),
          Point.create({ id: 'point2', toolIndex: 0 }),
          Line.create({ id: 'line1', toolIndex: 1 })
        ]
      })
      drawingTask.classifications = {
        addAnnotation: sinon.stub(),
        annotation () { return taskAnnotation }
      }
      drawingTask.start()
      marks = drawingTask.marks
      addAnnotation = drawingTask.classifications.addAnnotation.withArgs(drawingTask, [])
    })

    it('should add existing annotation marks to the task', function () {
      expect(marks.length).to.equal(3)
    })

    it('should clear marks from the current annotation', function () {
      expect(addAnnotation).to.have.been.calledOnce()
    })

    it('should copy marks to the correct tools', function () {
      expect(pointTool.marks.size).to.equal(2)
      expect(lineTool.marks.size).to.equal(1)
    })
  })
})
