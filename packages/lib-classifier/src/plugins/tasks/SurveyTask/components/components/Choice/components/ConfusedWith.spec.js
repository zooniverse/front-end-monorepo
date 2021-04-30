import { shallow } from 'enzyme'
import React from 'react'

// import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
// import { default as Task } from '@plugins/tasks/SurveyTask'
import ConfusedWith from './ConfusedWith'

describe.only('Component > Choice', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <ConfusedWith />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
