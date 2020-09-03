import { types } from 'mobx-state-tree'
import DrawingTask from '@plugins/tasks/DrawingTask'
import SHOWN_MARKS from '@helpers/shownMarks'

const details = [
  {
    type: 'multiple',
    question: 'which fruit?',
    answers: ['apples', 'oranges', 'pears'],
    required: ''
  },
  {
    type: 'single',
    question: 'how many?',
    answers: ['one', 'two', 'three'],
    required: ''
  },
  {
    type: 'text',
    instruction: 'Transcribe something',
    required: ''
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
    const drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
    expect(drawingTask).to.be.ok()
    expect(drawingTask).to.be.an('object')
  })

  it('should have a property `type` of `drawing`', function () {
    const drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
    expect(drawingTask).to.include({ type: 'drawing' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => DrawingTask.TaskModel.create({ type: 'orange' })).to.throw()
  })

  it('should load subtasks on creation.', function () {
    const drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
    expect(drawingTask.tools[0].tasks.length).to.equal(3)
    expect(drawingTask.tools[1].tasks.length).to.equal(0)
  })

  it('should assign task keys to subtasks.', function () {
    const drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
    const subtasks = drawingTask.tools[0].tasks
    subtasks.forEach((task, i) => expect(task.taskKey).to.equal(`T3.0.${i}`))
  })

  describe('drawn marks', function () {
    let marks
    before(function () {
      const drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      drawingTask.tools[0].createMark({ id: 'point1' })
      drawingTask.tools[0].createMark({ id: 'point2' })
      drawingTask.tools[1].createMark({ id: 'line1' })
      marks = drawingTask.marks
    })

    it('should exist for each drawn mark', function () {
      expect(marks.length).to.equal(3)
    })
  })

  describe('active mark', function () {
    let drawingTask
    let marks

    before(function () {
      drawingTask = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      drawingTask.tools[0].createMark({ id: 'point1' })
      drawingTask.tools[0].createMark({ id: 'point2' })
      drawingTask.tools[1].createMark({ id: 'line1' })
      marks = drawingTask.marks
    })

    it('should be undefined by default', function () {
      expect(drawingTask.activeMark).to.be.undefined()
    })

    it('should be set from stored marks', function () {
      const point1 = drawingTask.marks[0]
      drawingTask.setActiveMark(point1)
      expect(drawingTask.activeMark).to.equal(point1)
    })

    it('should hide previous marks', function () {
      expect(drawingTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      drawingTask.togglePreviousMarks()
      expect(drawingTask.shownMarks).to.equal(SHOWN_MARKS.NONE)
      expect(drawingTask.hidingIndex).to.equal(marks.length)
    })
  })

  describe('with subtask annotations', function () {
    let point1
    let point2
    let point3
    let pointSubTask
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      pointSubTask = task.tools[0].tasks[1]
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: DrawingTask.AnnotationModel,
        task: DrawingTask.TaskModel
      })
        .create({
          annotation,
          task
        })

      function updateMark (mark, value) {
        const markAnnotation = mark.addAnnotation(pointSubTask)
        pointSubTask.setAnnotation(markAnnotation)
        markAnnotation.update(value)
      }

      task.setAnnotation(annotation)
      point1 = task.tools[0].createMark({ id: 'point1' })
      point2 = task.tools[0].createMark({ id: 'point2' })
      point3 = task.tools[0].createMark({ id: 'point3' })

      updateMark(point1, 1)
      updateMark(point2, 1)
      updateMark(point3, 0)
    })

    it('should store an annotation for point1', function () {
      expect(point1.annotation(pointSubTask).task).to.equal('T3.0.1')
      expect(point1.annotation(pointSubTask).taskType).to.equal('single')
      expect(point1.annotation(pointSubTask).value).to.equal(1)
    })

    it('should store an annotation for point2', function () {
      expect(point2.annotation(pointSubTask).task).to.equal('T3.0.1')
      expect(point2.annotation(pointSubTask).taskType).to.equal('single')
      expect(point2.annotation(pointSubTask).value).to.equal(1)
    })

    it('should store an annotation for point3', function () {
      expect(point3.annotation(pointSubTask).task).to.equal('T3.0.1')
      expect(point3.annotation(pointSubTask).taskType).to.equal('single')
      expect(point3.annotation(pointSubTask).value).to.equal(0)
    })
  })

  describe('on complete', function () {
    let line1
    let point1
    let point2
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: DrawingTask.AnnotationModel,
        task: DrawingTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      task.setAnnotation(annotation)
      point1 = task.tools[0].createMark({ id: 'point1' })
      point2 = task.tools[0].createMark({ id: 'point2' })
      line1 = task.tools[1].createMark({ id: 'line1' })
      task.complete()
    })

    it('should copy marks to the task annotation', function () {
      expect(task.annotation.value).to.deep.equal([point1, point2, line1])
    })
  })

  describe('on reset', function () {
    let marks
    let pointTool
    let lineTool
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      const annotation = task.defaultAnnotation
      types.model('MockStore', {
        annotation: DrawingTask.AnnotationModel,
        task: DrawingTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      task.setAnnotation(annotation)
      pointTool = task.tools[0]
      lineTool = task.tools[1]
      task.setActiveTool(0)
      task.reset()
      marks = task.marks
    })

    it('should clear stale marks from the task', function () {
      expect(marks.length).to.equal(0)
    })

    it('should clear stale marks from the drawing tools', function () {
      expect(pointTool.marks.size).to.equal(0)
      expect(lineTool.marks.size).to.equal(0)
    })

    it('should reset the active tool', function () {
      expect(task.activeToolIndex).to.equal(0)
    })
  })
})
