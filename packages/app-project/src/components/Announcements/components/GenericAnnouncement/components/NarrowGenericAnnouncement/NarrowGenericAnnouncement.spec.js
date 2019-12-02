import { render, shallow } from 'enzyme'
import React from 'react'

import NarrowGenericAnnouncement from './NarrowGenericAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > GenericAnnouncement > NarrowGenericAnnouncement', function () {
  let wrapper

  before(function () {
    wrapper = render(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} closeFn={() => { }} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a paragraph with the announcement text', function () {
    const paragraphWrapper = wrapper.find('p')
    expect(paragraphWrapper.text()).to.contain(ANNOUNCEMENT)
  })

  it('should be the full width of its container', function () {
    const shallowWrapper = shallow(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} closeFn={() => { }} />)
    expect(shallowWrapper.prop('fill')).to.contain('horizontal')
  })
})
