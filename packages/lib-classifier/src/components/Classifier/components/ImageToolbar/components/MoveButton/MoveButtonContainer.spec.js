import { shallow } from 'enzyme'
import React from 'react'

import MoveButtonContainer from './MoveButtonContainer'

describe('Component > MoveButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MoveButtonContainer.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })
})
