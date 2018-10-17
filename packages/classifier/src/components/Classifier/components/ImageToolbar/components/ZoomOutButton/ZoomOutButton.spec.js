import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomOutButton from './ZoomOutButton'

describe('Component > ZoomOutButton', function () {
  it('should render without crashing', function () {
    shallow(<ZoomOutButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<ZoomOutButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('Zoom out from subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ZoomOutButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
