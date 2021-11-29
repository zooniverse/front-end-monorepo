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
    subject = classifierStore.subjects.active
    sinon.stub(classifierStore.classifications, 'completeClassification')
    sinon.stub(subject, 'openInTalk')

    wrapper = shallow(<DoneAndTalkButtonConnector store={classifierStore} />)
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

  describe('when there is another step in the workflow', function () {
    before(function () {
      // set an answer to the branching task question, so that step.next is set.
      const classification = classifierStore.classifications.active
      const singleChoiceAnnotation = classification.annotation({ taskKey: 'T0'})
      singleChoiceAnnotation.update(0)
      wrapper.update()
    })

    it('should be hidden', function () {
      const button = wrapper.find(DoneAndTalkButton)
      expect(button).to.be.empty()
    })
  })
})