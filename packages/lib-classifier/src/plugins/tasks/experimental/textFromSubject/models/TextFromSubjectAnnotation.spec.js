import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import TextFromSubjectAnnotation from './TextFromSubjectAnnotation'

describe('Model > TextFromSubjectAnnotation', function () {
  const subjectSnapshot = SubjectFactory.build({
    locations: [
      { 'text/plain': 'https://foo.bar/subjectText.txt' }
    ]
  })

  const workflowSnapshot = WorkflowFactory.build({
    tasks: {
      T0: {
        instruction: 'Correct the text',
        type: 'textFromSubject'
      }
    }
  })

  let textFromSubjectAnnotation

  before(function () {
    const store = mockStore({
      subject: subjectSnapshot,
      workflow: workflowSnapshot
    })

    const classification = store.classifications.active
    const step = store.workflowSteps.active
    const annotations = step.tasks.map(task => classification.annotation(task))
    textFromSubjectAnnotation = annotations[0]
  })

  it('should error for invalid annotations', function () {
    let errorThrown = false
    try {
      TextFromSubjectAnnotation.create({
        id: 'text1',
        task: 'T1',
        taskType: 'textFromSubject',
        value: 5
      })
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.be.true()
  })

  describe('without an initial update from subject content', function () {
    it('should exist', function () {
      expect(textFromSubjectAnnotation).to.be.ok()
      expect(textFromSubjectAnnotation).to.be.an('object')
    })

    it('should have a default value', function () {
      expect(textFromSubjectAnnotation.value).to.equal('')
    })

    it('should be incomplete', function () {
      expect(textFromSubjectAnnotation.isComplete).to.be.false()
    })

    it('should have initializedFromSubject of false', function () {
      expect(textFromSubjectAnnotation.initializedFromSubject).to.be.false()
    })
  })

  describe('with initial update from subject content', function () {
    before(function () {
      textFromSubjectAnnotation.updateFromSubject('Initial subject content')
    })
    
    it('should exist', function () {
      expect(textFromSubjectAnnotation).to.be.ok()
      expect(textFromSubjectAnnotation).to.be.an('object')
    })

    it('should have the expected value', function () {
      expect(textFromSubjectAnnotation.value).to.equal('Initial subject content')
    })

    it('should be complete', function () {
      expect(textFromSubjectAnnotation.isComplete).to.be.true()
    })

    it('should have initializedFromSubject of true', function () {
      expect(textFromSubjectAnnotation.initializedFromSubject).to.be.true()
    })
  })

  describe('with initial update from subject content and valid update from user', function () {
    before(function () {
      textFromSubjectAnnotation.updateFromSubject('Initial subject content')
      textFromSubjectAnnotation.update('Updated subject content')
    })

    it('should have the expected value', function () {
      expect(textFromSubjectAnnotation.value).to.equal('Updated subject content')
    })

    it('should be complete', function () {
      expect(textFromSubjectAnnotation.isComplete).to.be.true()
    })

    it('should have initializedFromSubject of true', function () {
      expect(textFromSubjectAnnotation.initializedFromSubject).to.be.true()
    })
  })
})
