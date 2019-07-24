import { shallow } from 'enzyme'
import React from 'react'

import { ProjectHeaderContainer } from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

let wrapper
let componentWrapper

const ROUTER = {
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

describe('Component > ProjectHeaderContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectHeaderContainer
      isLoggedIn={false}
      router={ROUTER}
    />)
    componentWrapper = wrapper.find(ProjectHeader)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectHeader` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `navLinks` prop', function () {
    expect(componentWrapper.prop('navLinks')).to.be.an('array')
  })
})
