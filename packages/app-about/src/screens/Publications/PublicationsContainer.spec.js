import { shallow } from 'enzyme'
import React from 'react'

import PublicationsContainer from './PublicationsContainer'
import Publications from './Publications'

let wrapper
let componentWrapper

describe('Component > PublicationsContainer', function () {
  before(function () {
    wrapper = shallow(<PublicationsContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Publications)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Publications` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
