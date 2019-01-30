import { shallow } from 'enzyme'
import React from 'react'

import ZooHeaderWrapperContainer from './ZooHeaderWrapperContainer'
import ZooHeaderWrapper from './ZooHeaderWrapper'

let wrapper
let componentWrapper

describe('Component > ZooHeaderWrapperContainer', function () {
  before(function () {
    wrapper = shallow(<ZooHeaderWrapperContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ZooHeaderWrapper)
  })

  it('should render without crashing', function () {})

  it('should render the `ZooHeaderWrapper` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
