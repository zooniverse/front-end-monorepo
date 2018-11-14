import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import SignInButton from './SignInButton'

describe('<SignInButton />', function () {
  let wrapper
  let onClickSpy
  before(function () {
    onClickSpy = sinon.spy()
    wrapper = shallow(<SignInButton onClick={onClickSpy} />)
  })

  afterEach(function () {
    onClickSpy.resetHistory()
  })

  it('renders without crashing', function () { })

  it('calls the onClick prop for the click event', function () {
    wrapper.simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })
})
