import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import mockStore from '@test/mockStore'

import DoneAndTalkButtonConnector from './'
import DoneAndTalkButton from './DoneAndTalkButton'

describe('Components > DoneAndTalkButtonConnector', function () {
  let wrapper
  let classifierStore
  let subject
  const preventDefaultSpy = sinon.spy()

  before(function () {
    classifierStore = mockStore()
    const store = { classifierStore }
    subject = classifierStore.subjects.active
    sinon.stub(classifierStore.classifications, 'completeClassification')
    sinon.stub(subject, 'openInTalk')

    wrapper = shallow(<DoneAndTalkButtonConnector store={store} />)
  })

  after(function () {
    classifierStore.classifications.completeClassification.restore()
    subject.openInTalk.restore()
  })

  describe('on click', function () {
    let onClick

    before(function () {
      const button = wrapper.find(DoneAndTalkButton)
      button.props().onClick({ preventDefault: preventDefaultSpy })
    })

    after(function () {
      classifierStore.classifications.completeClassification.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should complete the classification', function () {
      expect(classifierStore.classifications.completeClassification).to.have.been.calledOnce()
    })

    it('should open the subject in Talk', function () {
      const subject = classifierStore.subjects.active
      expect(subject.openInTalk.withArgs(undefined)).to.have.been.calledOnce()
    })
  })

  describe('on cmd-click', function () {
    let onClick

    before(function () {
      const button = wrapper.find(DoneAndTalkButton)
      button.props().onClick({
        metaKey: true,
        preventDefault: preventDefaultSpy
      })
    })

    after(function () {
      classifierStore.classifications.completeClassification.resetHistory()
      preventDefaultSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      const step = classifierStore.workflowSteps.active
      const classification = classifierStore.classifications.active
      step.tasks.forEach((task) => {
        const { task: taskKey, value } = task.defaultAnnotation()
        const annotation = classification.annotation(task)
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should complete the classification', function () {
      expect(classifierStore.classifications.completeClassification).to.have.been.calledOnce()
    })

    it('should open the subject in Talk in a new tab', function () {
      expect(subject.openInTalk.withArgs(true)).to.have.been.calledOnce()
    })
  })
})