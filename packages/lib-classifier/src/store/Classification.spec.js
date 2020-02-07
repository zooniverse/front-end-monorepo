import { getSnapshot } from 'mobx-state-tree'
import taskRegistry from '@plugins/tasks'
import Classification, { ClassificationMetadata } from './Classification'

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
})
