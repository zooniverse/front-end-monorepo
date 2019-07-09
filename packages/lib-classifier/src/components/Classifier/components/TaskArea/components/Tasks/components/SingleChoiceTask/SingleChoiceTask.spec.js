import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import SingleChoiceTask from './SingleChoiceTask'

// TODO: move this into a factory
const task = {
  answers: [{ label: 'yes' }, { label: 'no' }],
  question: 'Is there a cat?',
  required: true,
  taskKey: 'init',
  type: 'single'
}

describe('SingleChoiceTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SingleChoiceTask.wrappedComponent addAnnotation={() => {}} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a question', function () {
      expect(wrapper.contains(task.question)).to.be.true()
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer) => {
        expect(wrapper.find({ label: answer.label })).to.have.lengthOf(1)
      })
    })
  })

  describe('with an annotation', function () {
    let wrapper

    before(function () {
      const annotation = { task: task.taskKey, value: 0 }
      const annotations = new Map([[task.taskKey, annotation]])
      const addAnnotation = () => {}
      wrapper = shallow(
        <SingleChoiceTask.wrappedComponent
          annotations={annotations}
          addAnnotation={addAnnotation}
          task={task}
        />
      )
    })

    it('should check the selected answer', function () {
      const answer = task.answers[0]
      const input = wrapper.find({ label: answer.label })
      expect(input.prop('checked')).to.be.true()
    })
  })

  describe('onChange event handler', function () {
    let wrapper
    let addAnnotationSpy
    let onChangeSpy
    before(function () {
      addAnnotationSpy = sinon.spy()
      onChangeSpy = sinon.spy(SingleChoiceTask.wrappedComponent.prototype, 'onChange')
      wrapper = shallow(<SingleChoiceTask.wrappedComponent addAnnotation={addAnnotationSpy} task={task} />)
    })

    afterEach(function () {
      addAnnotationSpy.resetHistory()
      onChangeSpy.resetHistory()
    })

    after(function () {
      onChangeSpy.restore()
    })

    it('should bind the array index to the onChange handler', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(onChangeSpy.withArgs(index)).to.have.been.calledOnce()
      })
    })

    it('should call addAnnotation in the onChange handler with the array index and task as arguments if the event target is checked', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(addAnnotationSpy.withArgs(index, task)).to.have.been.calledOnce()
      })
    })

    it('should not call addAnnotation in the onChange handler if the event target is not checked', function () {
      const node = wrapper.find({ label: task.answers[0].label })
      node.simulate('change', { target: { checked: false } })
      expect(addAnnotationSpy.called).to.be.false()
    })
  })
})
