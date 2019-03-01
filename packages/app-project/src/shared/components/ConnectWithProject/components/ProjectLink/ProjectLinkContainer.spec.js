import { shallow } from 'enzyme'
import React from 'react'

import ProjectLinkContainer from './ProjectLinkContainer'
import ProjectLink from './ProjectLink'

let wrapper
let componentWrapper

describe('Component > ProjectLinkContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectLinkContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ProjectLink)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectLink` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
