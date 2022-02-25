import { types } from 'mobx-state-tree'
import TranscriptionTask from '@plugins/tasks/experimental/transcription'
import SHOWN_MARKS from '@helpers/shownMarks'

const details = [
  {
    type: 'text',
    instruction: 'Transcribe something',
    required: 'true'
  }
]

const transcriptionLineTool = {
  help: '',
  label: 'Underline the text',
  type: 'transcriptionLine',
  details
}

const transcriptionTaskSnapshot = {
  instruction: "Transcribe the text",
  taskKey: 'T3',
  tools: [transcriptionLineTool],
  type: 'transcription'
}

describe('Model > TranscriptionTask', function () {
  it('should exist', function () {
    const transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
    expect(transcriptionTask).to.be.ok()
    expect(transcriptionTask).to.be.an('object')
  })

  it('should have a property `type` of `drawing`', function () {
    const transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
    expect(transcriptionTask).to.include({ type: 'transcription' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => TranscriptionTask.TaskModel.create({ type: 'orange' })).to.throw()
  })

  it('should load a text subtask on creation.', function () {
    const transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
    expect(transcriptionTask.tools[0].tasks).to.have.lengthOf(1)
  })

  it('should assign task keys to subtasks.', function () {
    const transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
    const [textSubtask] = transcriptionTask.tools[0].tasks
    expect(textSubtask.taskKey).to.equal('T3.0.0')
  })

  describe('Views > defaultAnnotation', function () {
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
    })

    it('should be a valid annotation', function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.be.ok()
      expect(annotation.task).to.equal('T3')
      expect(annotation.taskType).to.equal('transcription')
    })

    it('should generate unique annotations', function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe('drawn marks', function () {
    let marks
    before(function () {
      const transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      transcriptionTask.tools[0].createMark({ id: 'transcriptionLine1' })
      marks = transcriptionTask.marks
    })

    it('should exist for each drawn mark', function () {
      expect(marks).to.have.lengthOf(1)
    })
  })

  describe('active mark', function () {
    let transcriptionTask

    before(function () {
      transcriptionTask = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      transcriptionTask.tools[0].createMark({ id: 'transcriptionLine1' })
    })

    it('should be undefined by default', function () {
      expect(transcriptionTask.activeMark).to.be.undefined()
    })

    it('should be set from stored marks', function () {
      const transcriptionLineMark = transcriptionTask.marks[0]
      transcriptionTask.setActiveMark(transcriptionLineMark)
      expect(transcriptionTask.activeMark).to.equal(transcriptionLineMark)
    })

    it('should hide previous marks', function () {
      expect(transcriptionTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      transcriptionTask.togglePreviousMarks(SHOWN_MARKS.USER)
      expect(transcriptionTask.shownMarks).to.equal(SHOWN_MARKS.USER)
      transcriptionTask.togglePreviousMarks(SHOWN_MARKS.NONE)
      expect(transcriptionTask.shownMarks).to.equal(SHOWN_MARKS.NONE)
      expect(transcriptionTask.hidingIndex).to.equal(transcriptionTask.marks.length)
      transcriptionTask.togglePreviousMarks(SHOWN_MARKS.ALL)
      expect(transcriptionTask.shownMarks).to.equal(SHOWN_MARKS.ALL)
      expect(transcriptionTask.hidingIndex).to.equal(0)
    })
  })

  describe('with subtask annotations', function () {
    let transcriptionLine
    let textSubTask
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      textSubTask = task.tools[0].tasks[0]
      const annotation = task.defaultAnnotation()

      function updateMark(mark, value) {
        const markAnnotation = mark.addAnnotation(textSubTask)
        markAnnotation.update(value)
      }

      transcriptionLine = task.tools[0].createMark({ id: 'transcriptionLine' })

      updateMark(transcriptionLine, 'foo')
    })

    it('should store an annotation for transcriptionLine', function () {
      expect(transcriptionLine.annotation(textSubTask).task).to.equal('T3.0.0')
      expect(transcriptionLine.annotation(textSubTask).taskType).to.equal('text')
      expect(transcriptionLine.annotation(textSubTask).value).to.equal('foo')
    })
  })

  describe('on complete', function () {
    let annotation
    let transcriptionLine
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      annotation = task.defaultAnnotation()
      const store = types.model('MockStore', {
        annotation: TranscriptionTask.AnnotationModel,
        task: TranscriptionTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      transcriptionLine = task.tools[0].createMark({ id: 'transcriptionLine1' })
      task.complete(annotation)
    })

    it('should reset the subtask visiblity', function () {
      expect(task.subTaskVisibility).to.be.false()
    })
  })

  describe('on reset', function () {
    let marks
    let transcriptionLineTool
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      const annotation = task.defaultAnnotation()
      transcriptionLineTool = task.tools[0]
      task.reset()
      marks = task.marks
    })

    it('should clear stale marks from the task', function () {
      expect(marks.length).to.equal(0)
    })

    it('should clear stale marks from the drawing tools', function () {
      expect(transcriptionLineTool.marks.size).to.equal(0)
    })


    it('should reset the active tool', function () {
      expect(task.activeToolIndex).to.equal(0)
    })
  })
})
