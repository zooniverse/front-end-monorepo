import sinon from 'sinon'
import mockStore from '@test/mockStore'

describe('Model > AnnotatedSteps', function () {
  let store

  before(function () {
    store = mockStore()
  })

  it('should exist', function () {
    expect(store.annotatedSteps).to.be.ok()
    expect(store.annotatedSteps).to.be.an('object')
  })

  describe('when the workflow starts', function () {
    it('should have one step', function () {
      expect(store.annotatedSteps.steps.size).to.equal(1)
    })

    it('should store the first workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      const { step } = store.annotatedSteps.latest
      expect(step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { annotations } = store.annotatedSteps.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })

  describe('after moving to the second step', function () {
    let firstStep

    before(function () {
      const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      firstStep = store.annotatedSteps.latest.step
      firstStep.tasks.forEach(task => {
        sinon.spy(task, 'validate')
      })
      store.annotatedSteps.next()
      const [ multipleChoiceAnnotation ] = store.annotatedSteps.latest.annotations
      // answer the T1 question so we can test redo.
      multipleChoiceAnnotation.update([0,1])
    })

    after(function () {
      firstStep.tasks.forEach(task => {
        task.validate.restore()
      })
    })

    it('should have two steps', function () {
      expect(store.annotatedSteps.steps.size).to.equal(2)
    })

    it('should validate the first step\'s tasks', function () {
      firstStep.tasks.forEach(task => expect(task.validate).to.have.been.calledOnce())
    })

    it('should store the second workflow step', function () {
      expect(store.workflowSteps.active.stepKey).to.equal('S1')
      const { step } = store.annotatedSteps.latest
      expect(step.stepKey).to.equal('S1')
    })

    it('should store the second step\'s annotations', function () {
      const { annotations } = store.annotatedSteps.latest
      const [ annotation ] = annotations
      expect(annotations.length).to.equal(1)
      expect(annotation.task).to.equal('T1')
    })

    it('should be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.true()
    })

    describe('on undo', function () {
      before(function () {
        store.annotatedSteps.back()
      })

      it('should store the first workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S0')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S0')
      })

      it('should store the first step\'s annotations', function () {
        const { annotations } = store.annotatedSteps.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T0')
      })

      it('should not be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.false()
      })
    })

    describe('on redo', function () {
      before(function () {
        store.annotatedSteps.next()
      })

      it('should return to the second workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S1')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S1')
      })

      it('should remember the second step\'s annotations', function () {
        const { annotations } = store.annotatedSteps.latest
        const [ annotation ] = annotations
        expect(annotations.length).to.equal(1)
        expect(annotation.task).to.equal('T1')
        expect(annotation.value).to.deep.equal([0,1])
      })

      it('should be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.true()
      })
    })

    describe('on going back and choosing a different branch', function () {
      before(function () {
        store.annotatedSteps.back()
        const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
        // answer No to the branching question.
        branchingQuestionAnnotation.update(1)
        store.annotatedSteps.next()
      })

      it('should load a new workflow step', function () {
        expect(store.workflowSteps.active.stepKey).to.equal('S2')
        const { step } = store.annotatedSteps.latest
        expect(step.stepKey).to.equal('S2')
      })

      it('should clear the second step\'s annotations from history', function () {
        const classification = store.classifications.active
        const annotation = classification.annotation('T1')
        expect(annotation).to.be.undefined()
      })

      it('should be able to undo', function () {
        expect(store.annotatedSteps.canUndo).to.be.true()
      })
    })

    describe('on finish',function () {
      before(function () {
        const { step } = store.annotatedSteps.latest
        step.tasks.forEach(task => {
          sinon.spy(task, 'validate')
          sinon.spy(task, 'complete')
        })
        store.annotatedSteps.finish()
      })

      after(function () {
        const { step } = store.annotatedSteps.latest
        step.tasks.forEach(task => {
          task.validate.restore()
          task.complete.restore()
        })
      })

      it('should validate the steps\' tasks', function () {
        const { step } = store.annotatedSteps.latest
        step.tasks.forEach(task => expect(task.validate).to.have.been.calledOnce())

      })

      it('should complete the final step', function () {
        const { step } = store.annotatedSteps.latest
        step.tasks.forEach(task => expect(task.complete).to.have.been.calledOnce())
      })

      it('should clear pending annotations', function () {
        const classification = store.classifications.active
        expect(classification.annotations.size).to.equal(store.annotatedSteps.annotations.length)
      })
    })
  })

  describe('on subject advance', function () {

    before(function () {
      store = mockStore()
      const [ branchingQuestionAnnotation ] = store.annotatedSteps.latest.annotations
      // answer Yes to the branching question.
      branchingQuestionAnnotation.update(0)
      store.annotatedSteps.next()
      store.subjects.advance()
    })

    it('should store the first workflow step', function () {
      const { latest } = store.annotatedSteps
      expect(store.workflowSteps.active.stepKey).to.equal('S0')
      expect(latest.step.stepKey).to.equal('S0')
    })

    it('should store the first step\'s annotations', function () {
      const { latest } = store.annotatedSteps
      expect(latest.annotations.length).to.equal(1)
      const [ annotation ] = latest.annotations
      expect(annotation.task).to.equal('T0')
    })

    it('should not be able to undo', function () {
      expect(store.annotatedSteps.canUndo).to.be.false()
    })
  })
})
