import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomInButton from './ZoomInButton'

describe('Component > ZoomInButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomInButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<ZoomInButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('Zoom in on subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ZoomInButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
