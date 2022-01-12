import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'

import NextButtonConnector from './'
import NextButton from './NextButton'

describe('Components > NextButtonConnector', function () {
  let wrapper
  let classifierStore

  before(function () {
    classifierStore = mockStore()
    wrapper = shallow(<NextButtonConnector store={classifierStore} />)
  })

  describe('on the last step of a workflow', function () {
    it('should be hidden', function () {
      const button = wrapper.find(NextButton)
      expect(button).to.be.empty()
    })
  })

  describe('on any other step of a workflow', function () {
    it('should be visible', function () {
      // set an answer to the first branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      wrapper = shallow(<NextButtonConnector store={classifierStore} />)
      const button = wrapper.find(NextButton)
      expect(button).to.have.lengthOf(1)
    })
  })

  describe('on click', function () {
    before(function () {
      const button = wrapper.find(NextButton)
      button.props().onClick()
      wrapper.update()
    })

    it('should create a default annotation for each new task if there is not an annotation for that task', function () {
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
      const step = classifierStore.workflowSteps.active
      expect(step.stepKey).to.equal('S1')
    })

    it.skip('should complete each active task',function () {
      const firstStep = classifierStore.workflowSteps.steps.get('S0')
      firstStep.tasks.forEach(task => {
        expect(task.complete).to.have.been.calledOnce()
      })
    })
  })
})