import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ZoomEventLayer from './ZoomEventLayer'

const parentWidth = 768
const parentHeight = 384

describe('Component > ZoomEventLayer', function () {
  let onMouseDownSpy, onMouseMoveSpy, onMouseUpSpy, onMouseLeaveSpy, onDoubleClickSpy, onWheelSpy, wrapper
  before(function () {
    onMouseDownSpy = sinon.spy()
    onMouseUpSpy = sinon.spy()
    onMouseMoveSpy = sinon.spy()
    onMouseLeaveSpy = sinon.spy()
    onDoubleClickSpy = sinon.spy()
    onWheelSpy = sinon.spy()

    wrapper = shallow(
      <ZoomEventLayer
        onDoubleClick={onDoubleClickSpy}
        onMouseDown={onMouseDownSpy}
        onMouseMove={onMouseMoveSpy}
        onMouseUp={onMouseUpSpy}
        onMouseLeave={onMouseLeaveSpy}
        onWheel={onWheelSpy}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
      />
    )
  })

  afterEach(function () {
    onDoubleClickSpy.resetHistory()
    onMouseDownSpy.resetHistory()
    onMouseUpSpy.resetHistory()
    onMouseMoveSpy.resetHistory()
    onMouseLeaveSpy.resetHistory()
    onWheelSpy.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should be transparent', function () {
    expect(wrapper.props().fill).to.equal('transparent')
  })

  it('should be the size of the parent', function () {
    expect(wrapper.props().height).to.equal(parentHeight)
    expect(wrapper.props().width).to.equal(parentWidth)
  })

  it('should call the onMouseDown prop callback when onMouseDown event fires', function () {
    wrapper.simulate('mousedown')
    expect(onMouseDownSpy).to.have.been.calledOnce()
  })

  it('should call the onMouseUp prop callback when onMouseUp event fires', function () {
    wrapper.simulate('mouseup')
    expect(onMouseUpSpy).to.have.been.calledOnce()
  })

  it('should call the onMouseMove prop callback when onMouseMove event fires', function () {
    wrapper.simulate('mousemove')
    expect(onMouseMoveSpy).to.have.been.calledOnce()
  })

  it('should call the onMouseLeave prop callback when onMouseLeave event fires', function () {
    wrapper.simulate('mouseleave')
    expect(onMouseLeaveSpy).to.have.been.calledOnce()
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
