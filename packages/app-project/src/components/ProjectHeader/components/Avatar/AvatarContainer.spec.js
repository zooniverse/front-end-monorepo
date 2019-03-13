import { shallow } from 'enzyme'
import React from 'react'

import AvatarContainer from './AvatarContainer'
import Avatar from './Avatar'

let wrapper
let componentWrapper

describe('Component > AvatarContainer', function () {
  before(function () {
    wrapper = shallow(<AvatarContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Avatar)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Avatar` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
