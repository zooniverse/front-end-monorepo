import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import FullscreenButton from './FullscreenButton'

describe.only('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = mount(<FullscreenButton />)
    expect(wrapper.find('button').prop('aria-label')).to.equal('View subject in full screen mode')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = mount(
      <FullscreenButton
        onClick={spy}
      />
    )
    wrapper.find('button').simulate('click')
    expect(spy.called).to.be.true
  })
})
