import { types } from 'mobx-state-tree'
import TranscriptionTask from '@plugins/tasks/experimental/TranscriptionTask'

const details = [
  {
    type: 'text',
    instruction: 'Transcribe something',
    required: true
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
  })

  describe('with subtask annotations', function () {
    let transcriptionLine
    let textSubTask
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      textSubTask = task.tools[0].tasks[0]
      const annotation = task.defaultAnnotation
      types.model('MockStore', {
        annotation: TranscriptionTask.AnnotationModel,
        task: TranscriptionTask.TaskModel
      })
        .create({
          annotation,
          task
        })

      function updateMark(mark, value) {
        const markAnnotation = mark.addAnnotation(textSubTask)
        textSubTask.setAnnotation(markAnnotation)
        markAnnotation.update(value)
      }

      task.setAnnotation(annotation)
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
    let transcriptionLine
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      const annotation = task.defaultAnnotation
      const store = types.model('MockStore', {
        annotation: TranscriptionTask.AnnotationModel,
        task: TranscriptionTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      task.setAnnotation(annotation)
      transcriptionLine = task.tools[0].createMark({ id: 'transcriptionLine1' })
      task.complete()
    })

    it('should copy marks to the task annotation', function () {
      expect(task.annotation.value).to.deep.equal([transcriptionLine])
    })
  })

  describe('on reset', function () {
    let marks
    let transcriptionLineTool
    let task

    before(function () {
      task = TranscriptionTask.TaskModel.create(transcriptionTaskSnapshot)
      const annotation = task.defaultAnnotation
      types.model('MockStore', {
        annotation: TranscriptionTask.AnnotationModel,
        task: TranscriptionTask.TaskModel
      })
        .create({
          annotation,
          task
        })
      task.setAnnotation(annotation)
      transcriptionLineTool = task.tools[0]
      task.setSubTaskVisibility(true)
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

    it('should reset the subtask visibility', function () {
      expect(task.subTaskVisibility).to.be.false()
    })
  })
})
