import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import FullscreenButton from './FullscreenButton'

describe('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<FullscreenButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('View subject in full screen mode')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <FullscreenButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
