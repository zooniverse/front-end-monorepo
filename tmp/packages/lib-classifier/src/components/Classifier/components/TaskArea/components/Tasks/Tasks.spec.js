import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Tasks } from './Tasks'
import asyncStates from '@zooniverse/async-states'

describe('Tasks', function () {
  const tasks = [{
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: true,
    taskKey: 'init',
    type: 'single'
  }]

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
    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.success} ready />)
    expect(wrapper.type()).to.be.null
  })

  it('should render the correct task component if the workflow is loaded', function () {
    const wrapper = shallow(<Tasks.wrappedComponent loadingState={asyncStates.success} ready tasks={tasks} />)
    // Is there a better way to do this?
    expect(wrapper.find('inject-SingleChoiceTask')).to.have.lengthOf(1)
  })

  describe('task components', function () {
    let taskWrapper

    describe('while the subject is loading', function () {
      before(function () {
        const wrapper = shallow(
          <Tasks.wrappedComponent
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.loading}
            tasks={tasks}
          />
        )
        taskWrapper = wrapper.find('inject-SingleChoiceTask')
      })

      it('should be disabled', function () {
        expect(taskWrapper.prop('disabled')).to.be.true
      })
    })

    describe('when the subject viewer is ready', function () {
      before(function () {
        const wrapper = shallow(
          <Tasks.wrappedComponent
            loadingState={asyncStates.success}
            subjectReadyState={asyncStates.success}
            tasks={tasks}
          />
        )
        taskWrapper = wrapper.find('inject-SingleChoiceTask')
      })

      it('should be enabled', function () {
        expect(taskWrapper.prop('disabled')).to.be.false
      })
    })
  })
})
