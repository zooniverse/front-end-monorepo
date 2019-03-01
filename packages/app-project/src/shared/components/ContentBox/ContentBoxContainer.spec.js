import { shallow } from 'enzyme'
import React from 'react'

import ContentBoxContainer from './ContentBoxContainer'
import ContentBox from './ContentBox'

let wrapper
let componentWrapper

describe('Component > ContentBoxContainer', function () {
  before(function () {
    wrapper = shallow(<ContentBoxContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ContentBox)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ContentBox` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
