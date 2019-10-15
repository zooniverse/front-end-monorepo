import { shallow } from 'enzyme'
import React from 'react'

import { ProjectAnnouncementContainer } from './ProjectAnnouncementContainer'
import ProjectAnnouncement from './ProjectAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > ProjectAnnouncementContainer', function () {
  let wrapper
  let componentWrapper

  before(function () {
    wrapper = shallow(<ProjectAnnouncementContainer announcement={ANNOUNCEMENT} />)
    componentWrapper = wrapper.find(ProjectAnnouncement)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectAnnouncement` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {

  })
})
