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
    const store = { classifierStore }
    sinon.stub(classifierStore.classifications, 'completeClassification')

    wrapper = shallow(<DoneButtonConnector store={store} />)
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
})