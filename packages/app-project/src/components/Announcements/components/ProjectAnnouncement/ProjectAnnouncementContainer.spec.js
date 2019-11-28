import { shallow } from 'enzyme'
import React from 'react'

import { ProjectAnnouncementContainer } from './ProjectAnnouncementContainer'
import GenericAnnouncement from '../GenericAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > ProjectAnnouncementContainer', function () {
  let wrapper
  let componentWrapper

  before(function () {
    wrapper = shallow(<ProjectAnnouncementContainer announcement={ANNOUNCEMENT} dismissBanner={() => {}} />)
    componentWrapper = wrapper.find(GenericAnnouncement)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `GenericAnnouncement` component if visible', function () {
    expect(wrapper.html()).to.be.null()
    expect(componentWrapper).to.have.lengthOf(0)
    wrapper.setProps({ isVisible: true })
    componentWrapper = wrapper.find(GenericAnnouncement)
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the required props', function () {
    expect(componentWrapper.props().announcement).to.equal(ANNOUNCEMENT)
    expect(componentWrapper.props().closeFn).to.be.a('function')
  })
})
