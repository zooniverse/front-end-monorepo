import { shallow } from 'enzyme'
import React from 'react'

// import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Confusion from './Confusion'

describe.only('Component > Confusion', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <Confusion />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
