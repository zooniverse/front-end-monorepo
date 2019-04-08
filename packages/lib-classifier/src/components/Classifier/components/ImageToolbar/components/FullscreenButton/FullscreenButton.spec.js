import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import FullscreenButton from './FullscreenButton'

describe('Component > FullscreenButton', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButton />)
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<FullscreenButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('a11yTitle')).to.equal('View subject in full screen mode')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <FullscreenButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
