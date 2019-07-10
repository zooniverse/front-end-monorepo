import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import RotateButton from './RotateButton'

describe('Component > RotateButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<RotateButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` prop', function () {
    const wrapper = shallow(<RotateButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('Rotate subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <RotateButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
