import { shallow } from 'enzyme'
import React from 'react'

import AuthModalsContainer from './AuthModalsContainer'
import AuthModals from './AuthModals'

let wrapper
let componentWrapper

describe('Component > AuthModalsContainer', function () {
  before(function () {
    wrapper = shallow(<AuthModalsContainer.wrappedComponent />)
    componentWrapper = wrapper.find(AuthModals)
  })

  it('should render without crashing', function () {})

  it('should render the `AuthModals` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
