import React from 'react'
import { shallow } from 'enzyme'
import StepNavigation from './StepNavigation'

describe.only('StepNavigation', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<StepNavigation.wrappedComponent />)
    expect(wrapper).to.be.ok
  })
})