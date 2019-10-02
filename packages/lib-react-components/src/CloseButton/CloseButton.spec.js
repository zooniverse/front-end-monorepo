import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import CloseButton from './CloseButton'

describe('<CloseButton />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<CloseButton closeFn={sinon.spy()} />)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('calls on the closeFn prop on click', function () {
    wrapper.simulate('click')
    expect(wrapper.props().closeFn).to.have.been.calledOnce()
  })
})
