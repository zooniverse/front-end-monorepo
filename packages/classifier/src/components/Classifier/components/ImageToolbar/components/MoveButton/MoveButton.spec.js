import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import MoveButton from './MoveButton'

describe('Component > MoveButton', function () {
  it('should render without crashing', function () {
    shallow(<MoveButton />)
  })

  it('should have an ARIA label', function () {
    const wrapper = shallow(<MoveButton />)
    expect(wrapper.find('Button').prop('aria-label')).to.equal('Move subject')
  })

  it('should call the onClick prop function on click', function () {
    const spy = sinon.spy()
    const wrapper = shallow(
      <MoveButton
        onClick={spy}
      />
    )
    wrapper.find('Button').simulate('click')
    expect(spy.called).to.be.true
  })
})
