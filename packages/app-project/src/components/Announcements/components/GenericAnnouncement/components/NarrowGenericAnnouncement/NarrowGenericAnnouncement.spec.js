import { render, shallow } from 'enzyme'
import React from 'react'

import NarrowGenericAnnouncement from './NarrowGenericAnnouncement'

const ANNOUNCEMENT = 'Arcu scelerisque curae eu sapien euismod nisl, viverra gravida donec interdum tempor vulputate nec, nam morbi rhoncus porta sollicitudin.'

describe('Component > GenericAnnouncement > NarrowGenericAnnouncement', function () {
  let wrapper

  before(function () {
    wrapper = render(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a paragraph with the announcement text', function () {
    const paragraphWrapper = wrapper.find('p')
    expect(paragraphWrapper.text()).to.contain(ANNOUNCEMENT)
  })

  it('should be the full width of its container', function () {
    const shallowWrapper = shallow(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} />)
    expect(shallowWrapper.prop('fill')).to.contain('horizontal')
  })

  it('should not render a close button', function () {
    const buttonWrapper = wrapper.find('button')
    expect(buttonWrapper).to.have.lengthOf(0)
  })

  describe('when dismissable', function () {
    before(function () {
      wrapper = render(<NarrowGenericAnnouncement announcement={ANNOUNCEMENT} dismissable closeFn={() => { }} />)
    })

    it('should render a close button', function () {
      const buttonWrapper = wrapper.find('button')
      expect(buttonWrapper).to.have.lengthOf(1)
    })
  })

  describe('when there are children nodes', function () {
    before(function () {
      wrapper = render(
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
