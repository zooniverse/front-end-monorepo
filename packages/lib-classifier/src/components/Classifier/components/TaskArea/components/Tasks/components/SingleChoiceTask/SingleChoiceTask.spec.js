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
      wrapper = shallow(<SingleChoiceTask addAnnotation={() => {}} task={task} />)
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
      onChangeSpy = sinon.spy(SingleChoiceTask.prototype, 'onChange')
      wrapper = shallow(<SingleChoiceTask addAnnotation={addAnnotationSpy} task={task} />)
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

    it('should call addAnnotation in the onChange handler with the array index and task as arguments', function () {
      wrapper.find('TaskInputField').forEach((node, index) => {
        node.simulate('change', { target: { checked: true } })
        expect(addAnnotationSpy.calledWith(index, task)).to.be.true
      })
    })

    it('should not call addAnnotation in the onChange handler if the event target is not checked', function () {
      const node = wrapper.find('TaskInputField').first()
      node.simulate('change', { target: { checked: false }})
      expect(addAnnotationSpy.called).to.be.false
    })
  })
})
