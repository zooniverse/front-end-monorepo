import { shallow } from 'enzyme'
import React from 'react'

import RegisterModalContainer from './RegisterModalContainer'
import RegisterModal from './RegisterModal'

let wrapper
let componentWrapper

describe('Component > RegisterModalContainer', function () {
  before(function () {
    wrapper = shallow(<RegisterModalContainer.wrappedComponent />)
    componentWrapper = wrapper.find(RegisterModal)
  })

  it('should render without crashing', function () {})

  it('should render the `RegisterModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
