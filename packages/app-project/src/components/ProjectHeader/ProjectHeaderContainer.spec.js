import { shallow } from 'enzyme'
import React from 'react'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

let wrapper
let componentWrapper

describe('Component > ProjectHeaderContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectHeaderContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ProjectHeader)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the `ProjectHeader` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
