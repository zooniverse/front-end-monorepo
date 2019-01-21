import { shallow } from 'enzyme'
import React from 'react'

import LoginModalContainer from './LoginModalContainer'
import LoginModal from './LoginModal'

let wrapper
let componentWrapper

describe('Component > LoginModalContainer', function () {
  before(function () {
    wrapper = shallow(<LoginModalContainer.wrappedComponent />)
    componentWrapper = wrapper.find(LoginModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the `LoginModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
