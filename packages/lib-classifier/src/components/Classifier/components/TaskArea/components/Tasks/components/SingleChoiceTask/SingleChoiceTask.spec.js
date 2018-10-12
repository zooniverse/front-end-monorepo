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
  before(function() {
    addAnnotationSpy = sinon.spy()
    wrapper = shallow(<SingleChoiceTask addAnnotation={addAnnotationSpy} task={task} />)
  })
  it('should render without crashing', function () {
    expect(wrapper).to.have.lengthOf(1)
  })

  it('should render the correct number of answer choices', function () {
    expect(wrapper.find('TaskInputField')).to.have.lengthOf(task.answers.length)
  })

  it('should bind `newAnnotation` and `taskKey` to the `addAnnotation` function', function () {
    wrapper.find('TaskInputField').forEach((node, index) => {
      node.simulate('change')
      expect(addAnnotationSpy.calledWith({value: index, task: task.taskKey}, task.type)).to.be.true
    })
  })
})
