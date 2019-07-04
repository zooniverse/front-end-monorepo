import { shallow } from 'enzyme'
import React from 'react'
import ResetButtonContainer from './ResetButtonContainer'

describe('Component > ResetButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ResetButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })
})
