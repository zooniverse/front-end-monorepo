import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import mockStore from '@test/mockStore'

import DoneButtonConnector from './'
import DoneButton from './DoneButton'

describe('Components > DoneButtonConnector', function () {
  let wrapper
  let classifierStore
  const preventDefaultSpy = sinon.spy()

  before(function () {
    classifierStore = mockStore()
    sinon.stub(classifierStore.classifications, 'completeClassification')

    wrapper = shallow(<DoneButtonConnector store={classifierStore} />)
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
    const button = wrapper.find(DoneButton)
    button.props().onClick({ preventDefault: preventDefaultSpy })
    step.tasks.forEach((task) => {
      const { task: taskKey, value } = task.defaultAnnotation()
      const annotation = classification.annotation(task)
      expect(annotation.task).to.equal(taskKey)
      expect(annotation.value).to.deep.equal(value)
    })
  })

  it('should prevent the event default', function () {
    const button = wrapper.find(DoneButton)
    button.props().onClick({ preventDefault: preventDefaultSpy })
    expect(preventDefaultSpy).to.have.been.calledOnce()
  })

  it('should complete the classification', function () {
    const button = wrapper.find(DoneButton)
    button.props().onClick({ preventDefault: preventDefaultSpy })
    expect(classifierStore.classifications.completeClassification).to.have.been.calledOnce()
  })

  describe('when there is another step in the workflow', function () {
    before(function () {
      // set an answer to the branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      wrapper.update()
    })

    it('should be hidden', function () {
      const button = wrapper.find(DoneButton)
      expect(button).to.be.empty()
    })
  })
})