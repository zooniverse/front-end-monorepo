import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import RotateButton from './RotateButton'

describe('Component > RotateButton', function () {
  it('should render without crashing', function () {
    shallow(<RotateButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<RotateButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('Rotate subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <RotateButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
