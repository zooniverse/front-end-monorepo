import * as tasks from '@plugins/tasks'
import TranscriptionLine from '@plugins/drawingTools/experimental/models/marks/TranscriptionLine'
import Point from '@plugins/drawingTools/models/marks/Point'
import Line from '@plugins/drawingTools/models/marks/Line'

import Classification, { ClassificationMetadata } from './'
import mockStore from '@test/mockStore'

describe('Model > Classification', function () {
  let model

  before(function () {
    model = Classification.create({
      annotations: [
        {
          task: 'T1',
          taskType: 'single',
          value: 1
        },
        {
          task: 'T0',
          taskType: 'text',
          value: 'Hello'
        }
      ],
      links: {
        project: '1234',
        subjects: ['4567'],
        workflow: '5678'
      },
      metadata: ClassificationMetadata.create({
        classifier_version: '2.0',
        source: 'api',
        userLanguage: 'en',
        workflowVersion: '1.0'
      })
    })
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have an ID', function () {
    expect(model.id).to.exist()
    expect(model.id).to.be.a('string')
  })

  describe('existing annotations', function () {
    it('should exist', function () {
      expect(model.annotations.size).to.equal(2)
    })

    it('should preserve the original array order', function () {
      const annotations = model.annotations.values()
      let annotation = annotations.next().value
      expect(annotation.task).to.equal('T1')
      expect(annotation.taskType).to.equal('single')
      expect(annotation.value).to.equal(1)
      annotation = annotations.next().value
      expect(annotation.task).to.equal('T0')
      expect(annotation.taskType).to.equal('text')
      expect(annotation.value).to.equal('Hello')
      annotation = annotations.next().value
      expect(annotation).to.be.undefined()
    })
  })

  describe('snapshots', function () {
    let snapshot
    let firstAnnotation
    let secondAnnotation

    before(function () {
      const store = mockStore()
      const classification = store.classifications.active
      // lets update a couple of mock annotations
      let step = store.workflowSteps.active
      const [ firstTask ] = step.tasks
      firstAnnotation = classification.addAnnotation(firstTask, 0)
      store.workflowSteps.selectStep('S1')
      step = store.workflowSteps.active
      const [ secondTask ] = step.tasks
      secondAnnotation = classification.addAnnotation(secondTask, [1])
      snapshot = classification.toSnapshot()
    })

    it('should not have an ID', function () {
      expect(snapshot.id).to.be.undefined()
    })

    it('should have an annotations array', function () {
      expect(snapshot.annotations).to.be.a('array')
    })

    it('should preserve annotation order', function () {
      expect(snapshot.annotations).to.deep.equal([ firstAnnotation.toSnapshot(), secondAnnotation.toSnapshot() ])
    })
  })

  describe('when there are previous annotations', function ()  {
    let singleChoice, text, drawingOne, transcription, drawingTwo

    beforeEach(function () {
      const {
        single: singleChoiceTask,
        text: textTask,
        drawing: drawingTask,
        transcription: transcriptionTask
      } = tasks

      model = Classification.create({
        annotations: [],
        links: {
          project: '1234',
          subjects: ['4567'],
          workflow: '5678'
        },
        metadata: ClassificationMetadata.create({
          classifier_version: '2.0',
          source: 'api',
          userLanguage: 'en',
          workflowVersion: '1.0'
        })
      })

      singleChoice = singleChoiceTask.TaskModel.create({
        question: 'yes or no?',
        answers: ['yes', 'no'],
        taskKey: 'T1',
        type: 'single'
      })
      text = textTask.TaskModel.create({
        instruction: 'type something',
        taskKey: 'T0',
        type: 'text'
      })
      drawingOne = drawingTask.TaskModel.create({
        instruction: 'draw something',
        taskKey: 'T2',
        type: 'drawing'
      })
      transcription = transcriptionTask.TaskModel.create({
        instruction: 'transcribe the text',
        taskKey: 'T3',
        type: 'transcription'
      })
      drawingTwo = drawingTask.TaskModel.create({
        instruction: 'draw another thing',
        taskKey: 'T4',
        type: 'drawing'
      })
    })

    describe('when the view function is called without an active step task key', function () {
      it('should return any drawing task annotation regardless of step activeness', function () {
        const pointMark = Point.create({ id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200, toolType: 'point' })
        const lineMark = Line.create({ id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 300, y2: 400, toolType: 'line' })
        model.addAnnotation(drawingOne, [pointMark])
        model.addAnnotation(drawingTwo, [lineMark])
        const previousAnnotations = model.previousInteractionTaskAnnotations()
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.have.lengthOf(2)
        expect(previousAnnotations[0].task).to.equal(drawingOne.taskKey)
        expect(previousAnnotations[1].task).to.equal(drawingTwo.taskKey)
      })
    })

    describe('when the previous annotations are not from drawing or transcription tasks', function () {
      it('should return an empty array', function () {
        model.addAnnotation(singleChoice, 0)
        model.addAnnotation(text, 'This is a text task')
        let previousAnnotations = model.previousInteractionTaskAnnotations(singleChoice.taskKey)
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.be.empty()

        previousAnnotations = model.previousInteractionTaskAnnotations(text.taskKey)
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.be.empty()
      })
    })

    describe('when the annotations are from the current drawing task', function () {
      it('should return an empty array', function () {
        const pointMark = Point.create({ id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200, toolType: 'point' })
        model.addAnnotation(drawingOne, [pointMark])
        const previousAnnotations = model.previousInteractionTaskAnnotations(drawingOne.taskKey)
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.be.empty()
      })
    })

    describe('when the annotations are from the previous drawing task', function () {
      it('should return an array of annotations', function () {
        const pointMark = Point.create({ id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200, toolType: 'point' })
        const lineMark = Line.create({ id: 'line1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 300, y2: 400, toolType: 'line' })

        model.addAnnotation(drawingOne, [pointMark])
        model.addAnnotation(drawingTwo, [lineMark])
        const previousAnnotations = model.previousInteractionTaskAnnotations(drawingTwo.taskKey)
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.have.lengthOf(1)
        expect(previousAnnotations[0].task).to.equal(drawingOne.taskKey)
      })
    })

    describe('when the annotations are from the current transcription task', function () {
      it('should return an empty array', function () {
        const transcriptionMark = TranscriptionLine.create({ id: 'transcriptionline1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200, toolType: 'transcriptionLine' })
        model.addAnnotation(transcription, [transcriptionMark])
        model.addAnnotation(singleChoice, 0)
        const previousAnnotations = model.previousInteractionTaskAnnotations(transcription.taskKey)
        expect(previousAnnotations).to.be.an('array')
        expect(previousAnnotations).to.be.empty()
      })
    })

    describe('when the annotations are from the previous transcription task', function () {
      it('should return an array of annotations', function () {
        const transcriptionMark = TranscriptionLine.create({ id: 'transcriptionline1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200, toolType: 'transcriptionLine' })
        model.addAnnotation(transcription, [transcriptionMark])
        model.addAnnotation(singleChoice, 0)
        const annotations = model.previousInteractionTaskAnnotations(singleChoice.taskKey)
        expect(annotations).to.be.an('array')
        expect(annotations).to.have.lengthOf(1)
        expect(annotations[0].task).to.deep.equal(transcription.taskKey)
      })
    })
  })
})
