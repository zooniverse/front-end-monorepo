import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Tasks } from './Tasks';
import asyncStates from '../../../../../../helpers/asyncStates'

describe('Tasks', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Tasks />)
    expect(wrapper).to.have.lengthOf(1)
  })

  it('should render null on initialization', function () {
    const wrapper = shallow(<Tasks />)
    expect(wrapper.html()).to.be.null
  })

  it('should render a loading UI when the workflow loading', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.loading} />)
    expect(wrapper.text()).to.equal('Loading')
  })

  it('should render an error message when there is a loading error', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.error} />)
    expect(wrapper.text()).to.equal('Something went wrong')
  })

  it('should render null if the workflow is load but has no tasks', function () {
    const wrapper = shallow(<Tasks loadingState={asyncStates.success} />)
    expect(wrapper.html()).to.be.null
  })

  it('should render the correct task component if the workflow is loaded', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'Is there a cat?',
      required: true,
      taskKey: 'init',
      type: 'single'
    }]

    const wrapper = shallow(<Tasks loadingState={asyncStates.success} tasks={tasks} />)
    expect(wrapper.find('SingleChoiceTask')).to.have.lengthOf(1)
  })
})