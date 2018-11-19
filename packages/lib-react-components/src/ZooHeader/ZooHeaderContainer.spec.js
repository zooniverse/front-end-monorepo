import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ZooHeaderContainer from './ZooHeaderContainer'
import ZooHeader from './ZooHeader'

describe('ZooHeaderContainer', function () {
  let wrapper
  let handleResizeSpy
  before(function () {
    handleResizeSpy = sinon.spy(ZooHeaderContainer.prototype, 'handleResize')
    wrapper = shallow(<ZooHeaderContainer signIn={() => { }} signOut={() => { }} user={{}} />)
  })

  afterEach(function () {
    handleResizeSpy.resetHistory()
  })

  after(function () {
    handleResizeSpy.restore()
  })

  it('renders without crashing', function () { })

  it('renders ZooHeader', function () {
    expect(wrapper.find(ZooHeader)).to.have.lengthOf(1)
  })

  it('calls #handleResize after mount', function () {
    expect(handleResizeSpy.calledOnce).to.be.true
  })

  it('calls #handleResize on the window resize event', function () {
    wrapper.simulate('resize')
    expect(handleResizeSpy.calledOnce).to.be.true
    wrapper.simulate('resize')
    expect(handleResizeSpy.calledTwice).to.be.true
  })
})
