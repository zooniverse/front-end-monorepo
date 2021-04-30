import { shallow } from 'enzyme'
import React from 'react'

// import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import ConfusedWith from './ConfusedWith'

describe.only('Component > ConfusedWith', function () {
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
