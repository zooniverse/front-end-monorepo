import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'mobx-state-tree'
import sinon from 'sinon'
import TaskNavButtonsContainer from './TaskNavButtonsContainer'
import TaskNavButtons from './TaskNavButtons'

import Step from '@store/WorkflowStepStore/Step'
import mockStore from '@test/mockStore'

describe('TaskNavButtonsContainer', function () {
  describe('when it renders', function () {
    let wrapper

    before(function () {
      const classifierStore = mockStore()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />).dive()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render TaskNavButtons', function () {
      expect(wrapper.find('TaskNavButtons')).to.have.lengthOf(1)
    })
  })

  describe('#goToNextStep', function () {
    let wrapper
    let classifierStore

    beforeEach(function () {
      classifierStore = mockStore()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />).dive()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().goToNextStep()
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should select the next step', function () {
      // set an answer to the branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().goToNextStep()
      const step = classifierStore.workflowSteps.active
      expect(step.stepKey).to.equal('S1')
    })
  })

  describe('#goToPreviousStep', function () {
    let wrapper
    let classifierStore

    before(function () {
      classifierStore = mockStore()
      const store = { classifierStore }
      wrapper = shallow(<TaskNavButtonsContainer store={store} />).dive()
    })

    it('should not go back if there is not a previous step', function () {
      let activeStep = classifierStore.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S0')
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().goToPreviousStep()
      activeStep = classifierStore.workflowSteps.active
      expect(activeStep.stepKey).to.equal('S0')
    })

    describe('when there is a previous step', function () {
      before(function() {
        // set an answer to the branching task question, so that step.next is set.
        const classification = classifierStore.classifications.active
        const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
        singleChoiceAnnotation.update(0)
        // push the first task to the history stack
        const buttons = wrapper.find(TaskNavButtons)
        buttons.props().goToNextStep()
        buttons.props().goToPreviousStep()
      })

      it('should undo the most recent step', function () {
        const { latest, steps} = classifierStore.annotatedSteps
        expect(steps.size).to.equal(1)
        expect(latest.step.stepKey).to.equal('S0')
      })

      it('should select the previous step', function () {
        const activeStep = classifierStore.workflowSteps.active
        expect(activeStep.stepKey).to.equal('S0')
      })

      it('should remove annotations for the current task', function () {
        const { annotations, steps } = classifierStore.annotatedSteps
        expect(steps.size).to.equal(1)
        const [annotation] = annotations.filter(annotation => annotation.task === 'T1')
        expect(annotation).to.be.undefined()
      })
    })
  })

  describe('#onSubmit', function () {
    let wrapper
    let classifierStore
    const preventDefaultSpy = sinon.spy()

    before(function () {
      classifierStore = mockStore()
      const store = { classifierStore }
      sinon.stub(classifierStore.classifications, 'completeClassification')

      wrapper = shallow(<TaskNavButtonsContainer store={store} />).dive()
    })

    afterEach(function () {
      classifierStore.classifications.completeClassification.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    after(function () {
      classifierStore.classifications.completeClassification.restore()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().onSubmit({ preventDefault: preventDefaultSpy })
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().onSubmit({ preventDefault: preventDefaultSpy })
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should complete the classification', function () {
      const buttons = wrapper.find(TaskNavButtons)
      buttons.props().onSubmit({ preventDefault: preventDefaultSpy })
      expect(classifierStore.classifications.completeClassification).to.have.been.calledOnce()
    })
  })
})
