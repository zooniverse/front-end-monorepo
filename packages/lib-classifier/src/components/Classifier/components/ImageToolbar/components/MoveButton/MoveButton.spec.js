import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MoveButton from './MoveButton'

describe('Component > MoveButton', function () {
  it('should render without crashing', function () {
    shallow(<MoveButton />)
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<MoveButton />)
    const button = wrapper.dive().dive()
    expect(button.prop('a11yTitle')).to.equal('Move subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <MoveButton
        onClick={spy}
      />
    )
    const button = wrapper.dive().dive()
    button.simulate('click')
    expect(spy.called).to.be.true
  })
})
