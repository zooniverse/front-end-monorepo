import sinon from 'sinon'
import DrawingTask from './DrawingTask'
import DrawingAnnotation from './DrawingAnnotation'

const details = [
  {
    type: 'multiple',
    question: 'which fruit?',
    answers: ['apples', 'oranges', 'pears'],
    required: false
  },
  {
    type: 'single',
    question: 'how many?',
    answers: ['one', 'two', 'three'],
    required: false
  },
  {
    type: 'text',
    instruction: 'Transcribe something',
    required: false
  }
]

const pointTool = {
  help: '',
  label: 'Point please.',
  type: 'point',
  details
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

  it('should load subtasks on creation.', function () {
    const drawingTask = DrawingTask.create(drawingTaskSnapshot)
    expect(drawingTask.tools[0].tasks.length).to.equal(3)
    expect(drawingTask.tools[1].tasks.length).to.equal(0)
  })

  it('should assign task keys to subtasks.', function () {
    const drawingTask = DrawingTask.create(drawingTaskSnapshot)
    const subtasks = drawingTask.tools[0].tasks
    subtasks.forEach((task, i) => expect(task.taskKey).to.equal(`T3.0.${i}`))
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
    })

    it('should copy marks to the task annotation', function () {
      expect(addAnnotation).to.have.been.calledOnce()
    })
  })

  describe('on reset', function () {
    let marks
    let pointTool
    let lineTool
    before(function () {
      const drawingTask = DrawingTask.create(drawingTaskSnapshot)
      pointTool = drawingTask.tools[0]
      lineTool = drawingTask.tools[1]
      const taskAnnotation = DrawingAnnotation.create({
        task: 'T3',
        taskType: drawingTask.type,
        value: []
      })
      drawingTask.classifications = {
        addAnnotation: sinon.stub(),
        annotation () { return taskAnnotation }
      }
      drawingTask.reset()
      marks = drawingTask.marks
    })

    it('should clear stale marks from the task', function () {
      expect(marks.length).to.equal(0)
    })

    it('should clear stale marks from the drawing tools', function () {
      expect(pointTool.marks.size).to.equal(0)
      expect(lineTool.marks.size).to.equal(0)
    })
  })
})
