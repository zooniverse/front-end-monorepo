import { shallow } from 'enzyme'
import React from 'react'

import NavContainer from './NavContainer'
import Nav from './Nav'

let wrapper
let componentWrapper

describe('Component > NavContainer', function () {
  before(function () {
    wrapper = shallow(<NavContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Nav)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Nav` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
