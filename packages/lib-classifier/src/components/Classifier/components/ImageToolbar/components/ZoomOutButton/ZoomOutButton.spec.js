import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomOutButton from './ZoomOutButton'

describe('Component > ZoomOutButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomOutButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<ZoomOutButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('Zoom out from subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ZoomOutButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
