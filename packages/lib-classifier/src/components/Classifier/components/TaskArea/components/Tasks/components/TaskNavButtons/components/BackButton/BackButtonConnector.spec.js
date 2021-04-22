import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'

import BackButtonConnector from './'
import BackButton from './BackButton'

describe('Components > BackButtonConnector', function () {
  let wrapper
  let classifierStore

  before(function () {
    classifierStore = mockStore()
    const store = { classifierStore }
    wrapper = shallow(<BackButtonConnector store={store} />)
  })

  it('should not appear on the first step', function () {
    let activeStep = classifierStore.workflowSteps.active
    expect(activeStep.stepKey).to.equal('S0')
    const button = wrapper.find(BackButton)
    expect(button).to.be.empty()
  })

  describe('when there is a previous step', function () {
    before(function() {
      // set an answer to the branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      // push the first task to the history stack
      classifierStore.annotatedSteps.next()
      const store = { classifierStore }
      wrapper = shallow(<BackButtonConnector store={store} />)
    })

    it('should be visible', function () {
      const button = wrapper.find(BackButton)
      expect(button).to.be.have.lengthOf(1)
    })

    describe('when clicked', function () {
      before(function () {
        const button = wrapper.find(BackButton)
        button.props().onClick()
      })

      it('should undo the most recent step', function () {
        const { latest, steps} = classifierStore.annotatedSteps
        expect(steps.size).to.equal(1)
        expect(latest.step.stepKey).to.equal('S0')
      })

      it('should select the previous step', function () {
        const button = wrapper.find(BackButton)
        button.props().onClick()
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
})