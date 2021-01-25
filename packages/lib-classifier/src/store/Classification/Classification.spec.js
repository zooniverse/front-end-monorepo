import taskRegistry from '@plugins/tasks'
import TranscriptionLine from '@plugins/drawingTools/experimental/models/marks/TranscriptionLine'
import Point from '@plugins/drawingTools/models/marks/Point'

import Classification, { ClassificationMetadata } from './'

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
      const singleChoiceTask = taskRegistry.get('single')
      const textTask = taskRegistry.get('text')
      const singleChoice = singleChoiceTask.TaskModel.create({
        question: 'yes or no?',
        answers: [ 'yes', 'no'],
        taskKey: 'T1',
        type: 'single'
      })
      const text = textTask.TaskModel.create({
        instruction: 'type something',
        taskKey: 'T0',
        type: 'text'
      })
      // lets update a couple of mock annotations
      firstAnnotation = model.addAnnotation(singleChoice, 0)
      secondAnnotation = model.addAnnotation(text, 'This is a text task')
      snapshot = model.toSnapshot()
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

  describe('interactionTaskAnnotations computed view', function ()  {
    let singleChoice, text, drawing, transcription

    before(function () {
      const singleChoiceTask = taskRegistry.get('single')
      const textTask = taskRegistry.get('text')
      const drawingTask = taskRegistry.get('drawing')
      const transcriptionTask = taskRegistry.get('transcription')
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
      drawing = drawingTask.TaskModel.create({
        instruction: 'draw something',
        taskKey: 'T2',
        type: 'drawing'
      })
      transcription = transcriptionTask.TaskModel.create({
        instruction: 'transcribe the text',
        taskKey: 'T3',
        type: 'transcription'
      })
    })

    it('should return an empty array if the stored annotations are not for drawing or transcription tasks', function ()  {
      model.addAnnotation(singleChoice, 0)
      model.addAnnotation(text, 'This is a text task')
      expect(model.interactionTaskAnnotations).to.be.an('array')
      expect(model.interactionTaskAnnotations).to.be.empty()
      model.removeAnnotation('T0')
      model.removeAnnotation('T1')
    })

    it('should return an array of annotations if the stored annotations are for drawing tasks', function () {
      const pointMark = Point.create({ id: 'point1', frame: 0, toolIndex: 0, x: 100, y: 200, toolType: 'point' })
      model.addAnnotation(drawing, [pointMark])
      const annotations = model.interactionTaskAnnotations
      expect(annotations).to.be.an('array')
      expect(annotations).to.have.lengthOf(1)
      expect(annotations[0].task).to.equal(drawing.taskKey)
      model.removeAnnotation('T2')
    })

    it('should return an array of annotations if the stored annotations are for transcription tasks', function () {
      const transcriptionMark = TranscriptionLine.create({ id: 'transcriptionline1', frame: 0, toolIndex: 0, x1: 100, y1: 200, x2: 150, y2: 200, toolType: 'transcriptionLine' })
      model.addAnnotation(transcription, [transcriptionMark])
      const annotations = model.interactionTaskAnnotations
      expect(annotations).to.be.an('array')
      expect(annotations).to.have.lengthOf(1)
      expect(annotations[0].task).to.deep.equal(transcription.taskKey)
      model.removeAnnotation('T3')
    })
  })
})
