import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import RotateButton from './RotateButton'

describe('Component > RotateButton', function () {
  it('should render without crashing', function () {
    shallow(<RotateButton />)
  })

  it('should have an `a11yTitle` prop', function () {
    const wrapper = shallow(<RotateButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('a11yTitle')).to.equal('Rotate subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <RotateButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
