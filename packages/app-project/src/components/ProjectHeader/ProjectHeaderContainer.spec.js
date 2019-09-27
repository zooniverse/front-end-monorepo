import { shallow } from 'enzyme'
import React from 'react'
import { projects } from '@zooniverse/panoptes-js'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

let wrapper
let componentWrapper

const PROJECT_DISPLAY_NAME = 'Foobar'
const ROUTER = {
  query: {
    owner: 'Foo',
    project: 'Bar'
  }
}

describe('Component > ProjectHeaderContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectHeaderContainer.wrappedComponent
      projectName={PROJECT_DISPLAY_NAME}
      router={ROUTER}
    />)
    componentWrapper = wrapper.dive().find(ProjectHeader)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectHeader` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the project title', function () {
    expect(componentWrapper.prop('title')).to.equal(PROJECT_DISPLAY_NAME)
  })

  it('should pass down the nav links', function () {
    expect(componentWrapper.prop('navLinks').length).to.be.above(0)
  })
})
