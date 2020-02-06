import { getSnapshot } from 'mobx-state-tree'
import taskRegistry from '@plugins/tasks'
import Classification, { ClassificationMetadata } from './Classification'

describe('Model > Classification', function () {
  let model
  let firstAnnotation
  let secondAnnotation

  before(function () {
    const singleChoiceTask = taskRegistry.get('single')
    const textTask = taskRegistry.get('text')
    model = Classification.create({
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
    firstAnnotation = model.addAnnotation(singleChoice, 0)
    secondAnnotation = model.addAnnotation(text, 'This is a text task')
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have an ID', function () {
    expect(model.id).to.exist()
    expect(model.id).to.be.a('string')
  })

  describe('snapshots', function () {
    let snapshot

    before(function () {
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
