import { shallow } from 'enzyme'
import React from 'react'

import GenericAnnouncement from './GenericAnnouncement'
import NarrowGenericAnnouncement from './components/NarrowGenericAnnouncement'
import WideGenericAnnouncement from './components/WideGenericAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > ProjectAnnouncement', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<GenericAnnouncement announcement={ANNOUNCEMENT} closeFn={() => {}} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the NarrowProjectAnnouncement component', function () {
    expect(wrapper.find(NarrowGenericAnnouncement)).to.have.lengthOf(1)
  })

  it('should render the WideProjectAnnouncement component', function () {
    expect(wrapper.find(WideGenericAnnouncement)).to.have.lengthOf(1)
  })
})
