import { shallow } from 'enzyme'
import React from 'react'

import ProjectAnnouncement from './ProjectAnnouncement'
import NarrowProjectAnnouncement from './components/NarrowProjectAnnouncement'
import WideProjectAnnouncement from './components/WideProjectAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > ProjectAnnouncement', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ProjectAnnouncement announcement={ANNOUNCEMENT} closeFn={() => {}} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the NarrowProjectAnnouncement component', function () {
    expect(wrapper.find(NarrowProjectAnnouncement)).to.have.lengthOf(1)
  })

  it('should render the WideProjectAnnouncement component', function () {
    expect(wrapper.find(WideProjectAnnouncement)).to.have.lengthOf(1)
  })
})
