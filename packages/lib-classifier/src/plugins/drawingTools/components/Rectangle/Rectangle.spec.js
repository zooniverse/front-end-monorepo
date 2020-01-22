import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Rectangle from './Rectangle'
import DragHandle from '../DragHandle'

describe('Rectangle tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Rectangle
      mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
    />)
    expect(wrapper).to.be.ok()
  })

  it('should render a rectangle with the coordinates provided', function () {
    const wrapper = shallow(
      <Rectangle
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />)
    expect(wrapper.containsMatchingElement(<rect x={85} y={180} width={30} height={40} />)).to.be.true()
  })
    
  it('should render an active rectangle with four drag handles', function () {
    const wrapper = mount(
      <Rectangle
        active
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />)
    expect(wrapper.find(DragHandle)).to.have.lengthOf(4)
    
        
    console.log('-'.repeat(80))
    console.log(wrapper.debug())
    console.log('-'.repeat(80))
  })
})

  /*
  <g>
  <rect x={85} y={180} width={30} height={40} />
  <rect x={85} y={180} width={30} height={40} strokeWidth={6} strokeOpacity="0" />
  <draggable(DragHandle) scale={1} x={85} y={180} dragMove={[Function: dragMove]} coords={{...}} dragStart={[Function: dragStart]} dragEnd={[Function: dragEnd]} />
  <draggable(DragHandle) scale={1} x={115} y={220} dragMove={[Function: dragMove]} coords={{...}} dragStart={[Function: dragStart]} dragEnd={[Function: dragEnd]} />
  <draggable(DragHandle) scale={1} x={85} y={220} dragMove={[Function: dragMove]} coords={{...}} dragStart={[Function: dragStart]} dragEnd={[Function: dragEnd]} />
  <draggable(DragHandle) scale={1} x={115} y={180} dragMove={[Function: dragMove]} coords={{...}} dragStart={[Function: dragStart]} dragEnd={[Function: dragEnd]} />
</g>
  
   */