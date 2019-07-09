import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import FullscreenButton from './FullscreenButton'

describe('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FullscreenButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<FullscreenButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('View subject in full screen mode')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <FullscreenButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
