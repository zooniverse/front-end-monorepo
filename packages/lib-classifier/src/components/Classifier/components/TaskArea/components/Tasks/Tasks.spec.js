import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'

describe('Tasks', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Tasks.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should render null on initialization', function () {
    const wrapper = shallow(<Tasks.wrappedComponent />)
    expect(wrapper.type()).to.be.null
  })

  it('should render a loading UI when the workflow loading', function () {
    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.loading} />)
    expect(wrapper.contains('Loading')).to.be.true
  })

  it('should render an error message when there is a loading error', function () {
    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.error} />)
    expect(wrapper.contains('Something went wrong')).to.be.true
  })

  it('should render null if the workflow is load but has no tasks', function () {
    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.success} />)
    expect(wrapper.type()).to.be.null
  })

  it('should render the correct task component if the workflow is loaded', function () {
    const tasks = [{
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'Is there a cat?',
      required: true,
      taskKey: 'init',
      type: 'single'
    }]

    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.success} tasks={tasks} />)
    // Is there a better way to do this?
    expect(wrapper.find('inject-SingleChoiceTask')).to.have.lengthOf(1)
  })
})
