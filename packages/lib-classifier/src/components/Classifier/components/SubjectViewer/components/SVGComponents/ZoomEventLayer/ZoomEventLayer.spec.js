import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { ZoomEventLayer } from './ZoomEventLayer'

const width = 768
const height = 384

describe('Component > ZoomEventLayer', function () {
  let onKeyDownSpy, onPointerDownSpy, onPointerMoveSpy, onPointerUpSpy, onPointerLeaveSpy, onDoubleClickSpy, onWheelSpy, wrapper
  before(function () {
    onKeyDownSpy = sinon.spy()
    onPointerDownSpy = sinon.spy()
    onPointerUpSpy = sinon.spy()
    onPointerMoveSpy = sinon.spy()
    onPointerLeaveSpy = sinon.spy()
    onDoubleClickSpy = sinon.spy()
    onWheelSpy = sinon.spy()

    wrapper = shallow(
      <ZoomEventLayer
        onDoubleClick={onDoubleClickSpy}
        onKeyDown={onKeyDownSpy}
        onPointerDown={onPointerDownSpy}
        onPointerMove={onPointerMoveSpy}
        onPointerUp={onPointerUpSpy}
        onPointerLeave={onPointerLeaveSpy}
        onWheel={onWheelSpy}
        height={height}
        width={width}
      />
    )
  })

  afterEach(function () {
    onKeyDownSpy.resetHistory()
    onDoubleClickSpy.resetHistory()
    onPointerDownSpy.resetHistory()
    onPointerUpSpy.resetHistory()
    onPointerMoveSpy.resetHistory()
    onPointerLeaveSpy.resetHistory()
    onWheelSpy.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should be transparent', function () {
    expect(wrapper.props().fill).to.equal('transparent')
  })

  it('should be the size of the parent', function () {
    expect(wrapper.props().height).to.equal(height)
    expect(wrapper.props().width).to.equal(width)
  })

  it('should call the onKeyDown prop callbak when onKeyDown event fires', function () {
    wrapper.simulate('keydown')
    expect(onKeyDownSpy).to.have.been.calledOnce()
  })

  it('should call the onPointerDown prop callback when onPointerDown event fires', function () {
    wrapper.simulate('pointerdown')
    expect(onPointerDownSpy).to.have.been.calledOnce()
  })

  it('should call the onPointerUp prop callback when onPointerUp event fires', function () {
    wrapper.simulate('pointerup')
    expect(onPointerUpSpy).to.have.been.calledOnce()
  })

  it('should call the onPointerMove prop callback when onPointerMove event fires', function () {
    wrapper.simulate('pointermove')
    expect(onPointerMoveSpy).to.have.been.calledOnce()
  })

  it('should call the onPointerLeave prop callback when onPointerLeave event fires', function () {
    wrapper.simulate('pointerleave')
    expect(onPointerLeaveSpy).to.have.been.calledOnce()
  })

  it('should call the onDoubleClick prop callback when onDoubleClick event fires', function () {
    wrapper.simulate('dblclick')
    expect(onDoubleClickSpy).to.have.been.calledOnce()
  })

  it('should call the onWheel prop callback when onWheel event fires', function () {
    wrapper.simulate('wheel')
    expect(onWheelSpy).to.have.been.calledOnce()
  })
})
