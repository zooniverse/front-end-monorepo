import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SingleChoiceTask from './SingleChoiceTask';

// TODO: move this into a factory
const task = {
  answers: [{ label: 'yes' }, { label: 'no' }],
  question: 'Is there a cat?',
  required: true,
  taskKey: 'init',
  type: 'single'
}

describe('SingleChoiceTask', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SingleChoiceTask task={task} />)
    expect(wrapper).to.have.lengthOf(1)
  })

  it('should render the correct number of answer choices', function () {
    const wrapper = shallow(<SingleChoiceTask task={task} />)
    expect(wrapper.find('TaskInputField')).to.have.lengthOf(task.answers.length)
  })

  it('should not render a help button if there is no help text', function () {
    const wrapper = shallow(<SingleChoiceTask task={task} />)
    expect(wrapper.find('TaskHelpButton')).to.have.lengthOf(0)
  })

  it('should render a help button if there is help text', function () {
    const taskWithHelp = { ...task, help: 'Please help!' }
    const wrapper = shallow(<SingleChoiceTask task={taskWithHelp} />)
    expect(wrapper.find('TaskHelpButton')).to.have.lengthOf(1)
  })
})