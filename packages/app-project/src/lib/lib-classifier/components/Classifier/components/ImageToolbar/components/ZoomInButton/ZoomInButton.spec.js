import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomInButton from './ZoomInButton'

describe('Component > ZoomInButton', function () {
  it('should render without crashing', function () {
    shallow(<ZoomInButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<ZoomInButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('aria-label')).to.equal('Zoom in on subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ZoomInButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
