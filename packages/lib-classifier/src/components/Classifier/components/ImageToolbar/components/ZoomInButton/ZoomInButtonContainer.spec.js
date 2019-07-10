import { shallow } from 'enzyme'
import React from 'react'
import ZoomInButtonContainer from './ZoomInButtonContainer'

describe('Component > ZoomInButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomInButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })
})
