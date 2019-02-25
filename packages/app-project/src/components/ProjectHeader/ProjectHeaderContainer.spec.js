import { shallow } from 'enzyme'
import React from 'react'
import { projects } from '@zooniverse/panoptes-js'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

let wrapper
let componentWrapper

const PROJECT = projects.mocks.resources.projectOne

describe('Component > ProjectHeaderContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectHeaderContainer.wrappedComponent project={PROJECT} />)
    componentWrapper = wrapper.find(ProjectHeader)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectHeader` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the project title', function () {
    expect(componentWrapper.prop('title')).to.equal(PROJECT.display_name)
  })
})
