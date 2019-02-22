import { shallow } from 'enzyme'
import React from 'react'

import ConnectWithProject from './ConnectWithProject'
import ProjectLink from './components/ProjectLink'

let wrapper
const PROJECT_NAME = 'project'
const URLS = [
  {
    label: 'foo',
    url: 'bar'
  }
]

describe('Component > ConnectWithProject', function () {
  before(function () {
    wrapper = shallow(<ConnectWithProject
      projectName={PROJECT_NAME}
      urls={URLS}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a `ProjectLink` for each url', function () {
    const projectLinks = wrapper.find(ProjectLink)
    expect(projectLinks).to.have.lengthOf(1)
  })
})
