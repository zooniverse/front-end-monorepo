import { shallow } from 'enzyme'
import React from 'react'
import { CloseButton } from '@zooniverse/react-components'
import NarrowGenericAnnouncement from './NarrowGenericAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > GenericAnnouncement > NarrowGenericAnnouncement', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render announcement text', function () {
    expect(wrapper.contains(ANNOUNCEMENT)).to.be.true()
  })

  it('should be the full width of its container', function () {
    const shallowWrapper = shallow(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} />)
    expect(shallowWrapper.prop('fill')).to.contain('horizontal')
  })

  it('should not render a close button', function () {
    const buttonWrapper = wrapper.find(CloseButton)
    expect(buttonWrapper).to.have.lengthOf(0)
  })

  describe('when dismissable', function () {
    before(function () {
      wrapper = shallow(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} dismissable closeFn={() => { }} />)
    })

    it('should render a close button', function () {
      const buttonWrapper = wrapper.find(CloseButton)
      expect(buttonWrapper).to.have.lengthOf(1)
    })
  })

  describe('when there are children nodes', function () {
    before(function () {
      wrapper = shallow(
        <NarrowGenericAnnouncement announcement={ANNOUNCEMENT}>
          <span id='child'></span>
        </NarrowGenericAnnouncement>
      )
    })

    it('should render the children', function () {
      const child = wrapper.find('span#child')
      expect(child).to.have.lengthOf(1)
    })
  })
})
