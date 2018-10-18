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
  let wrapper
  let addAnnotationSpy
  let onChangeSpy
  before(function () {
    addAnnotationSpy = sinon.spy()
    onChangeSpy = sinon.spy(SingleChoiceTask.prototype, 'onChange')
    wrapper = shallow(<SingleChoiceTask addAnnotation={addAnnotationSpy} task={task} />)
  })
  it('should render without crashing', function () {
    expect(wrapper).to.have.lengthOf(1)
  })

  it('should render the correct number of answer choices', function () {
    expect(wrapper.find('TaskInputField')).to.have.lengthOf(task.answers.length)
  })

  it('should call addAnnotation in the onChange event handler', function () {
    wrapper.find('TaskInputField').forEach((node, index) => {
      node.simulate('change', { target: { value: index }})
      expect(onChangeSpy.called).to.be.true
      expect(addAnnotationSpy.calledWith({value: index, task: task.taskKey}, task.type)).to.be.true
    })
  })
})
