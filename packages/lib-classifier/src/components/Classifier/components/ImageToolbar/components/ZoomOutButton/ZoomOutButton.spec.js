import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomOutButton from './ZoomOutButton'

describe('Component > ZoomOutButton', function () {
  it('should render without crashing', function () {
    shallow(<ZoomOutButton />)
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<ZoomOutButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('a11yTitle')).to.equal('Zoom out from subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ZoomOutButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
