import { shallow } from 'enzyme'
import React from 'react'

import FullscreenButtonContainer from './FullscreenButtonContainer'

describe('Component > FullscreenButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FullscreenButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })
})
