import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import FullscreenButton from './FullscreenButton'

describe('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<FullscreenButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('View subject in full screen mode')
  })

  it('should call the enableFullscreen prop function on click if fullscreen is not active', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <FullscreenButton
        fullscreen={false}
        enableFullscreen={spy}
      />
    )
    wrapper.find('button').simulate('click')
    expect(spy.called).to.equal(true)
  })

  it('should call the disableFullscreen prop function on click if fullscreen is active', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <FullscreenButton
        fullscreen
        disableFullscreen={spy}
      />
    )
    wrapper.find('button').simulate('click')
    expect(spy.called).to.equal(true)
  })
})
