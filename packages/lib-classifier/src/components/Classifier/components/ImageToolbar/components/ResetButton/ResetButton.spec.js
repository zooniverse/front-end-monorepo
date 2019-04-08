import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ResetButton from './ResetButton'

describe('Component > ResetButton', function () {
  it('should render without crashing', function () {
    shallow(<ResetButton />)
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<ResetButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('a11yTitle')).to.equal('Reset subject view')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <ResetButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
