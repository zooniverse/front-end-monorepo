import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { observable } from 'mobx'
import MultipleChoiceTask from './MultipleChoiceTask'
import TaskInputField from '../TaskInputField'

// TODO: move this into a factory
const task = {
  answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
  question: 'What is/are the cat(s) doing?',
  required: false,
  taskKey: 'T1',
  type: 'multiple'
}

describe('MultipleChoiceTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<MultipleChoiceTask.wrappedComponent addAnnotation={() => { }} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should have a question', function () {
      expect(wrapper.contains(task.question)).to.be.true
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer) => {
        expect(wrapper.find({ label: answer.label })).to.have.lengthOf(1)
      })
    })
  })

  describe('onChange event handler', function () {
    let wrapper
    let addAnnotationSpy
    let onChangeSpy
    before(function () {
      addAnnotationSpy = sinon.spy()
      onChangeSpy = sinon.spy(MultipleChoiceTask.wrappedComponent.prototype, 'onChange')
      wrapper = shallow(
        <MultipleChoiceTask.wrappedComponent
          addAnnotation={addAnnotationSpy}
          annotations={observable.map()}
          task={task}
        />
      )
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
        expect(onChangeSpy.calledWith(index)).to.be.true
      })
    })

    it('should call addAnnotation in the onChange handler with an array of indices and the task as arguments', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(addAnnotationSpy.calledWith([index], task)).to.be.true
      })
    })

    it('should push the index to the value array if the event target is checked and the existing annotations array does not include the index', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      const lastNode = wrapper.find({ label: task.answers[2].label })
      firstNode.simulate('change', { target: { checked: true } })
      expect(addAnnotationSpy.calledWith([0], task)).to.be.true

      const annotations = observable.map([['T1', { value: [0], task: 'T1' }]])
      wrapper.setProps({ annotations })
      lastNode.simulate('change', { target: { checked: true } })
      expect(addAnnotationSpy.calledWith([0, 2], task)).to.be.true
    })

    it('should splice the index from the value array if the event target is unchecked and the existing annotations value array includes the index', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      firstNode.simulate('change', { target: { checked: true } })
      const annotations = observable.map([['T1', { value: [0], task: 'T1' }]])
      wrapper.setProps({ annotations })
      firstNode.simulate('change', { target: { checked: false } })
      expect(addAnnotationSpy.secondCall.calledWith([], task)).to.be.true
    })
  })
})
