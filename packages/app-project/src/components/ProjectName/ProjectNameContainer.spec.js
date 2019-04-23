import { shallow } from 'enzyme'
import React from 'react'

import ProjectNameContainer from './ProjectNameContainer'
import ProjectName from './ProjectName'

let wrapper
let componentWrapper
const PROJECT_NAME = 'Foobar'

describe('Component > ProjectNameContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectNameContainer.wrappedComponent projectName={PROJECT_NAME} />)
    componentWrapper = wrapper.find(ProjectName)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectName` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass the `projectName` prop to the `ProjectName` component', function () {
    expect(componentWrapper.prop('projectName')).to.equal(PROJECT_NAME)
  })
})
