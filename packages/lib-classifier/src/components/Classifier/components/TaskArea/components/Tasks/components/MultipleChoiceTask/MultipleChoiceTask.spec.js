import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MultipleChoiceTask from './MultipleChoiceTask'

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
      wrapper = shallow(<MultipleChoiceTask addAnnotation={() => { }} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should have a question', function () {
      expect(wrapper.find('GrommetMarkdown').text()).to.equal(task.question)
    })

    it('should render the correct number of answer choices', function () {
      expect(wrapper.find('TaskInputField')).to.have.lengthOf(task.answers.length)
    })
  })

  describe('onChange event handler', function () {
    let wrapper
    let addAnnotationSpy
    let onChangeSpy
    before(function () {
      addAnnotationSpy = sinon.spy()
      onChangeSpy = sinon.spy(MultipleChoiceTask.prototype, 'onChange')
      wrapper = shallow(
        <MultipleChoiceTask
          addAnnotation={addAnnotationSpy}
          annotations={new Map()}
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
      wrapper.find('TaskInputField').forEach((node, index) => {
        node.simulate('change', { target: { checked: true } })
        expect(onChangeSpy.calledWith(index)).to.be.true
      })
    })

    it('should call addAnnotation in the onChange handler with an array of indices and the task as arguments', function () {
      const node = wrapper.find('TaskInputField').first()
      node.simulate('change', { target: { checked: true } })
      expect(addAnnotationSpy.calledWith([0], task)).to.be.true

    })

    it('should push the index to the value array if the event target is checked and the existing annotations array does not include the index', function () {
      const firstNode = wrapper.find('TaskInputField').first()
      const lastNode = wrapper.find('TaskInputField').last()
      firstNode.simulate('change', { target: { checked: true } })
      expect(addAnnotationSpy.calledWith([0], task)).to.be.true

      const annotations = new Map([['T1', { value: [0], task: 'T1' }]])
      wrapper.setProps({ annotations })
      lastNode.simulate('change', { target: { checked: true } })
      expect(addAnnotationSpy.calledWith([0, 2], task)).to.be.true
    })

    it('should splice the index from the value array if the event target is unchecked and the existing annotations value array includes the index', function () {
      const firstNode = wrapper.find('TaskInputField').first()
      firstNode.simulate('change', { target: { checked: true } })
      const annotations = new Map([['T1', { value: [0], task: 'T1' }]])
      wrapper.setProps({ annotations })
      firstNode.simulate('change', { target: { checked: false } })
      expect(addAnnotationSpy.secondCall.calledWith([], task)).to.be.true
    })
  })
})
