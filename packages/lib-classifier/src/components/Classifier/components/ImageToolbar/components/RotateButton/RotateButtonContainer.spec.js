import { shallow } from 'enzyme'
import React from 'react'
import RotateButtonContainer from './RotateButtonContainer'

describe('Component > RotateButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<RotateButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })
})
