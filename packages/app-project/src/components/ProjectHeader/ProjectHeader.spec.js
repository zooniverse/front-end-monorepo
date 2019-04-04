import { shallow } from 'enzyme'
import React from 'react'

import { ProjectHeader } from './ProjectHeader'
import Avatar from './components/Avatar'
import ProjectTitle from './components/ProjectTitle'
import ApprovedIcon from './components/ApprovedIcon'


const TITLE = 'Project title'
let wrapper

describe.only('Component > ProjectHeader', function () {
  before(function () {
    wrapper = shallow(<ProjectHeader title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a `<Avatar />` component', function () {
    expect(wrapper.find(Avatar)).to.have.lengthOf(1)
  })

  it('should render a `<ProjectTitle />` component', function () {
    expect(wrapper.find(ProjectTitle)).to.have.lengthOf(1)
  })

  it('should render a `<ApprovedIcon />` component', function () {
    expect(wrapper.find(ApprovedIcon)).to.have.lengthOf(1)
  })
})
