import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ResetButton from './ResetButton'

describe('Component > ResetButton', function () {
  it('should render without crashing', function () {
    shallow(<ResetButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<ResetButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('Reset subject view')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ResetButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
