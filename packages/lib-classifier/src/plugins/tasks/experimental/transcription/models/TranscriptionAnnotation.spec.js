import { types } from 'mobx-state-tree'
import TranscriptionTask from './TranscriptionTask'
import TranscriptionAnnotation from './TranscriptionAnnotation'
import { TranscriptionLine } from '@plugins/drawingTools/experimental/models/marks'

describe('Model > TranscriptionAnnotation', function () {
  const transcriptionLine = TranscriptionLine.create({
    id: 'mockAnnotation',
    frame: 0,
    toolIndex: 0,
    toolType: 'transcriptionLine',
    x1: 10,
    y1: 30,
    x2: 20,
    y2: 30
  })


  const transcriptionAnnotationSnapshot = {
    id: 'transcription1',
    task: 'T0',
    taskType: 'transcription',
    value: [transcriptionLine.id]
  }

  it('should exist', function () {
    const transcriptionAnnotation = TranscriptionAnnotation.create(transcriptionAnnotationSnapshot)
    expect(transcriptionAnnotation).to.exist()
    expect(transcriptionAnnotation).to.be.an('object')
  })

  describe('annotation snapshot', function () {
    function buildMockAnnotation({ taskSnapshot }) {
      const transcriptionTask = TranscriptionTask.create(taskSnapshot)
      const annotation = transcriptionTask.createAnnotation()
      // TODO: build a more realistic model tree here.
      types.model('MockStore', {
        transcriptionTask: TranscriptionTask,
        annotation: TranscriptionAnnotation
      })
        .create({
          transcriptionTask,
          annotation
        })
      return { annotation, transcriptionTask }
    }

    describe('with text subtask', function () {
      let snapshot

      before(function () {
        const { annotation, transcriptionTask } = buildMockAnnotation({
          taskSnapshot: {
            instruction: 'transcribe the text',
            taskKey: 'T0',
            tools: [
              {
                type: 'transcriptionLine',
                details: [{
                  type: 'text',
                  instruction: 'transcribe the text',
                  answers: 'foo'
                }]
              }
            ],
            type: 'transcription'
          }
        })
        const transcriptionLineTool = transcriptionTask.tools[0]
        const transcriptionLine1 = transcriptionLineTool.createMark({
          x1: 50,
          x2: 100,
          y1: 100,
          y2: 200
        })
        const transcriptionLine2 = transcriptionLineTool.createMark({
          x1: 150,
          x2: 175,
          y1: 200,
          y2: 238
        })
        const textTask = transcriptionLineTool.tasks[0]
        transcriptionLine1.addAnnotation(textTask, 'foo')
        transcriptionLine2.addAnnotation(textTask, 'bar')
        snapshot = annotation.toSnapshot()
      })

      it('should be an array', function () {
        expect(snapshot).to.be.a('array')
      })

      it('should contain the task annotation plus one annotation for the text subtask', function () {
        expect(snapshot).to.have.lengthOf(3)
      })

      it('should contain snapshots of the annotation plus text subtask answer', function () {
        const [annotation] = snapshot
        const transcriptionLine1Answer = {
          task: 'T0.0.0',
          taskType: 'text',
          value: 'foo',
          markIndex: 0
        }

        const transcriptionLine2Answer = {
          task: 'T0.0.0',
          taskType: 'text',
          value: 'bar',
          markIndex: 1
        }

        expect(snapshot).to.deep.equal([annotation, transcriptionLine1Answer, transcriptionLine2Answer])
      })

      describe('the annotation snapshot', function () {
        it('should contain a task key', function () {
          const [annotation] = snapshot
          expect(annotation.task).to.equal('T0')
        })

        it('should contain a taskType', function () {
          const [annotation] = snapshot
          expect(annotation.taskType).to.equal('transcription')
        })

        it('should include snapshots of the drawn marks', function () {
          const [annotation] = snapshot
          const transcriptionLine1Snapshot = {
            details: [{ task: 'T0.0.0' }],
            frame: 0,
            toolIndex: 0,
            toolType: 'transcriptionLine',
            x1: 50,
            x2: 100,
            y1: 100,
            y2: 200
          }
          const transcriptionLine2Snapshot = {
            details: [{ task: 'T0.0.0' }],
            frame: 0,
            toolIndex: 0,
            toolType: 'transcriptionLine',
            x1: 150,
            x2: 175,
            y1: 200,
            y2: 238
          }
          expect(annotation.value).to.deep.equal([transcriptionLine1Snapshot, transcriptionLine2Snapshot])
        })
      })
    })
  })
})
