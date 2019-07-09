import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MoveButton from './MoveButton'

describe('Component > MoveButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MoveButton />)
    expect(wrapper).to.be.ok()
  })

  it('should have an `a11yTitle` label', function () {
    const wrapper = shallow(<MoveButton />)
    expect(wrapper.prop('a11yTitle')).to.equal('Move subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <MoveButton
        onClick={spy}
      />
    )
    wrapper.simulate('click')
    expect(spy).to.have.been.called()
  })
})
