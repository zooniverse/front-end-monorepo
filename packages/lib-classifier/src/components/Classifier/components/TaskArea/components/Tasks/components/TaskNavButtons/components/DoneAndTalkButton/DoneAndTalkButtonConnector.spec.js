import { shallow } from 'enzyme'
import sinon from 'sinon'

import mockStore from '@test/mockStore'

import DoneAndTalkButtonConnector from './'
import DoneAndTalkButton from './DoneAndTalkButton'

describe('Components > DoneAndTalkButtonConnector', function () {
  let wrapper
  let classifierStore
  let classification
  let annotations
  let step
  let subject
  const preventDefaultSpy = sinon.spy()

  beforeEach(function () {
    classifierStore = mockStore()
    classification = classifierStore.classifications.active
    subject = classifierStore.subjects.active
    step = classifierStore.workflowSteps.active
    annotations = step.tasks.map(task => classification.annotation(task))

    wrapper = shallow(<DoneAndTalkButtonConnector store={classifierStore} />)
  })

  describe('on click', function () {
    let onClick

    beforeEach(function () {
      const button = wrapper.find(DoneAndTalkButton)
      button.props().onClick({ preventDefault: preventDefaultSpy })
    })

    afterEach(function () {
      preventDefaultSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      annotations.forEach((annotation, index) => {
        const task = step.tasks[index]
        const { task: taskKey, value } = task.defaultAnnotation()
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should complete the classification', function () {
      expect(classification.completed).to.be.true()
    })

    it('should open the subject in Talk', function () {
      const talkURL = `https://example.org/projects/zooniverse/example/talk/subjects/${subject.id}`
      expect(subject.shouldDiscuss.newTab).to.be.false()
      expect(subject.shouldDiscuss.url).to.equal(talkURL)
    })
  })

  describe('on cmd-click', function () {
    let onClick

    beforeEach(function () {
      const button = wrapper.find(DoneAndTalkButton)
      button.props().onClick({
        metaKey: true,
        preventDefault: preventDefaultSpy
      })
    })

    afterEach(function () {
      preventDefaultSpy.resetHistory()
    })

    it('should create a default annotation for each task if there is not an annotation for that task', function () {
      annotations.forEach((annotation, index) => {
        const task = step.tasks[index]
        const { task: taskKey, value } = task.defaultAnnotation()
        expect(annotation.task).to.equal(taskKey)
        expect(annotation.value).to.deep.equal(value)
      })
    })

    it('should prevent the event default', function () {
      expect(preventDefaultSpy).to.have.been.calledOnce()
    })

    it('should complete the classification', function () {
      expect(classification.completed).to.be.true()
    })

    it('should open the subject in Talk in a new tab', function () {
      expect(subject.shouldDiscuss.newTab).to.be.true()
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