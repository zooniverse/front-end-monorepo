import { types } from 'mobx-state-tree'
import DrawingTask from '@plugins/tasks/DrawingTask'
import SHOWN_MARKS from '@helpers/shownMarks'
import sinon from 'sinon'

describe('Model > DrawingTask', function () {
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
    min: 1,
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

  const singleRequiredSubtask = {
    taskKey: 'T4.0.0',
    type: 'single',
    question: 'how many?',
    answers: ['one', 'two', 'three'],
    required: true
  }

  const pointToolWithRequiredSubtask = {
    help: '',
    label: 'Point please.',
    type: 'point',
    details: [singleRequiredSubtask]
  }

  const drawingTaskRequiredSubtaskSnapshot = {
    instruction: "Mark each cat's face and tail. Draw an ellipse around each cat's face (not including the ears), and mark the tail tip with a point.",
    taskKey: 'T4',
    tools: [pointToolWithRequiredSubtask],
    type: 'drawing'
  }

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

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T3')
      expect(annotation.taskType).to.equal('drawing')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('Views > isComplete', function () {
    describe('with minimum marks', function () {
      let task

      before(function () {
        task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      })

      it('should return isComplete of false for under minimum tool mark count', function () {
        expect(task.isComplete()).to.be.false()
      })

      it('should return isComplete of true for over minimum tool mark count', function () {
        task.tools[0].createMark({ id: 'point1' })
        task.tools[0].createMark({ id: 'point2' })

        expect(task.isComplete()).to.be.true()
      })
    })

    describe('with tool with incomplete required subtask', function () {
      let task

      before(function () {
        task = DrawingTask.TaskModel.create(drawingTaskRequiredSubtaskSnapshot)
        task.tools[0].createTask(singleRequiredSubtask)
        task.tools[0].createMark({ id: 'point3' })
      })

      it('should return isComplete of false', function () {
        expect(task.isComplete()).to.be.false()
      })
    })

    describe('with tool with complete required subtask', function () {
      let mark
      let singleTask
      let task

      before(function () {
        task = DrawingTask.TaskModel.create(drawingTaskRequiredSubtaskSnapshot)
        singleTask = task.tools[0].createTask(singleRequiredSubtask)
        mark = task.tools[0].createMark({ id: 'point4' })
      })

      it('should return isComplete of true', function () {
        mark.addAnnotation(singleTask, 1)

        expect(task.isComplete()).to.be.true()
      })
    })
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

      function updateMark (mark, value) {
        const markAnnotation = mark.addAnnotation(pointSubTask)
        markAnnotation.update(value)
      }

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
    let annotation
    let line1
    let point1
    let point2
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      annotation = task.defaultAnnotation()
      types.model('MockStore', {
        annotation: DrawingTask.AnnotationModel,
        task: DrawingTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      point1 = task.tools[0].createMark({ id: 'point1' })
      point2 = task.tools[0].createMark({ id: 'point2' })
      line1 = task.tools[1].createMark({ id: 'line1' })
      annotation.update(task.marks)
      task.complete(annotation)
    })

    it('should reset the subtask visiblity', function () {
      expect(task.subTaskVisibility).to.be.false()
    })

    describe('on deleting a mark', function () {
      before(function () {
        task.tools[1].deleteMark(line1)
      })

      it('should remove the mark', function () {
        expect(task.marks).to.deep.equal([point1, point2])
      })

      it('should update the annotation', function () {
        expect(annotation.value).to.deep.equal([point1, point2])
      })
    })

    describe('on creating a mark', function () {
      let line2
      before(function () {
        line2 = task.tools[1].createMark({ id: 'line2' })
      })

      it('should add a new mark', function () {
        expect(task.marks).to.deep.equal([point1, point2, line2])
      })
    })
  })

  describe('on reset', function () {
    let marks
    let pointTool
    let lineTool
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
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

  describe('validation', function () {
    let task

    before(function () {
      task = DrawingTask.TaskModel.create(drawingTaskSnapshot)
      task.tools[0].createMark({ id: 'point1' })
      task.tools[0].createMark({ id: 'point2' })
    })

    describe('computing validity for all of the tools marks', function () {
      it('should return true when all marks are valid', function () {
        expect(task.isValid).to.be.true()
      })

      it('should return false when there is an invalid mark for any of the tools', function () {
        expect(task.isValid).to.be.true()
        task.tools[1].createMark({ id: 'line1' })
        expect(task.isValid).to.be.false()
      })
    })

    it.skip('should call validate for each tool', function () {
      task.validate()
      expect(pointToolValidateSpy).to.have.been.calledOnce()
      expect(lineToolValidateSpy).to.have.been.calledOnce()
    })
  })
})
