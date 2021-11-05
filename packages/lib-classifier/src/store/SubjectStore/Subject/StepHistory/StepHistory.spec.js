import sinon from 'sinon'
import mockStore from '@test/mockStore'

describe('Model > StepHistory', function () {
  let store, stepHistory

  before(function () {
    store = mockStore()
    stepHistory = store.subjects.active.stepHistory
  })

  it('should exist', function () {
    expect(stepHistory).to.be.ok()
    expect(stepHistory).to.be.an('object')
  })

  describe('check for progress', function () {
    before(function () {
      store = mockStore()
      stepHistory = store.subjects.active.stepHistory
    })

    it('should be false', function () {
      expect(stepHistory.checkForProgress).to.be.false()
    })

    it('should be true after updating an annotation', function () {
      const { annotations } = stepHistory.latest
      const [ annotation ] = annotations
      annotation.update(0)
      expect(stepHistory.checkForProgress).to.be.true()
    })

    it('should reset on starting a new subject', function () {
      expect(stepHistory.checkForProgress).to.be.true()
      store.subjects.advance()
      expect(stepHistory.checkForProgress).to.be.false()
    })
  })

  describe('when the workflow starts', function () {
    before(function () {
      store = mockStore()
      stepHistory = store.subjects.active.stepHistory
    })

    it('should have one step', function () {
      expect(stepHistory.steps.size).to.equal(1)
    })

    it('should store the first workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      const { step } = stepHistory.latest
      expect(step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { annotations } = stepHistory.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(stepHistory.canUndo).to.be.false()
    })
  })

  describe('after moving to the second step', function () {
    let firstStep

    before(function () {
      const [ branchingQuestionAnnotation ] = stepHistory.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      firstStep = stepHistory.latest.step
      stepHistory.next()
      const [ multipleChoiceAnnotation ] = stepHistory.latest.annotations
      // answer the T1 question so we can test redo.
      multipleChoiceAnnotation.update([0,1])
    })

    it('should have two steps', function () {
      expect(stepHistory.steps.size).to.equal(2)
    })

    it('should store the second workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S1')
      const { step } = stepHistory.latest
      expect(step.stepKey).to.equal('S1')
    })

    it('should store the second step\'s annotations', function () {
      const { annotations } = stepHistory.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T1')
    })

    it('should be able to undo', function () {
      expect(stepHistory.canUndo).to.be.true()
    })

    describe('on undo', function () {
      before(function () {
        stepHistory.back()
      })

      it('should store the first workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S0')
        const { step } = stepHistory.latest
        expect(step.stepKey).to.equal('S0')
      })

      it('should store the first step\'s annotations', function () {
        const { annotations } = stepHistory.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T0')
      })

      it('should not be able to undo', function () {
        expect(stepHistory.canUndo).to.be.false()
      })
    })

    describe('on redo', function () {
      before(function () {
        stepHistory.next()
      })

      it('should return to the second workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S1')
        const { step } = stepHistory.latest
        expect(step.stepKey).to.equal('S1')
      })

      it('should remember the second step\'s annotations', function () {
        const { annotations } = stepHistory.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T1')
        expect(annotation.value).to.deep.equal([0,1])
      })

      it('should be able to undo', function () {
        expect(stepHistory.canUndo).to.be.true()
      })
    })

    describe('on going back and choosing a different branch', function () {
      before(function () {
        stepHistory.back()
        const [ branchingQuestionAnnotation ] = stepHistory.latest.annotations
        // answer No to the branching question.
        branchingQuestionAnnotation.update(1)
        stepHistory.next()
      })

      it('should load a new workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S2')
        const { step } = stepHistory.latest
        expect(step.stepKey).to.equal('S2')
      })

      it('should clear the second step\'s annotations from history', function () {
        const classification = store.classifications.active
        const annotation = classification.annotation('T1')
        expect(annotation).to.be.undefined()
      })

      it('should be able to undo', function () {
        expect(stepHistory.canUndo).to.be.true()
      })
    })

    describe('on finish',function () {
      before(function () {
        stepHistory.finish()
      })

      it('should clear pending annotations', function () {
        const classification = store.classifications.active
        expect(classification.annotations.size).to.equal(stepHistory.annotations.length)
      })
    })
  })

  describe('on subject advance', function () {

    before(function () {
      store = mockStore()
      stepHistory = store.subjects.active.stepHistory
      const [ branchingQuestionAnnotation ] = stepHistory.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      stepHistory.next()
      store.subjects.advance()
    })

    it('should store the first workflow step', function () {
      const { latest } = stepHistory
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      expect(latest.step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { latest } = stepHistory
      expect(latest.annotations.length).to.equal(1)
      const [ annotation ] = latest.annotations
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(stepHistory.canUndo).to.be.false()
    })
  })
})
