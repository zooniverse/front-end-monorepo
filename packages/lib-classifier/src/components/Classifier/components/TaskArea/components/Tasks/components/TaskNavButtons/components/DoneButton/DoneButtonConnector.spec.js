import { shallow } from 'enzyme'
import sinon from 'sinon'

import mockStore from '@test/mockStore'

import DoneButtonConnector from './'
import DoneButton from './DoneButton'

describe('Components > DoneButtonConnector', function () {
  let wrapper
  let classifierStore
  let classification
  let annotations
  let step
  const preventDefaultSpy = sinon.spy()

  beforeEach(function () {
    classifierStore = mockStore()
    classification = classifierStore.classifications.active
    step = classifierStore.workflowSteps.active
    annotations = step.tasks.map(task => classification.annotation(task))

    wrapper = shallow(<DoneButtonConnector store={classifierStore} />)
  })

  afterEach(function () {
    preventDefaultSpy.resetHistory()
  })

  it('should create a default annotation for each task if there is not an annotation for that task', function () {
    const button = wrapper.find(DoneButton)
    button.props().onClick({ preventDefault: preventDefaultSpy })
    annotations.forEach((annotation, index) => {
      const task = step.tasks[index]
      const { task: taskKey, value } = task.defaultAnnotation()
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
    expect(classification.completed).to.be.true()
  })

  describe('when there is another step in the workflow', function () {
    beforeEach(function () {
      // set an answer to the branching task question, so that step.next is set.
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