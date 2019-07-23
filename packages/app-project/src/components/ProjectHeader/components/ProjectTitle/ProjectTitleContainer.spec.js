import { shallow } from 'enzyme'
import React from 'react'
import { projects } from '@zooniverse/panoptes-js'

import { ProjectTitleContainer } from './ProjectTitleContainer'
import ProjectTitle from './ProjectTitle'

let wrapper
let componentWrapper

const TITLE = projects.mocks.resources.projectOne['display_name']
const ROUTER = {
  pathname: '/home',
  query: { owner: 'foo', project: 'bar' }
}

describe('Component > ProjectTitleContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectTitleContainer
      router={ROUTER}
      title={TITLE}
    />)
    componentWrapper = wrapper.find(ProjectTitle)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectTitle` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the project title', function () {
    expect(componentWrapper.prop('title')).to.equal(TITLE)
  })

  it('should pass a null value for the `link` prop when on the project home page', function () {
    expect(componentWrapper.prop('link')).to.equal(null)
  })

  it('should pass a correct `link` prop when not on the project home page', function () {
    const NON_HOME_ROUTER = {
      ...ROUTER,
      pathname: '/about'
    }

    const EXPECTED_RESULT = {
      as: '/projects/foo/bar',
      href: {
        pathname: '/home',
        query: { owner: 'foo', project: 'bar' }
      }
    }

    wrapper = shallow(<ProjectTitleContainer
      router={NON_HOME_ROUTER}
      title={TITLE}
    />)
    componentWrapper = wrapper.find(ProjectTitle)
    expect(componentWrapper.prop('link')).to.deep.equal(EXPECTED_RESULT)
  })
})
