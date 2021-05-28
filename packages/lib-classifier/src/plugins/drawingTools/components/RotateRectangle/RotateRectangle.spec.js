import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import { default as RotateRectangleMark } from '@plugins/drawingTools/models/marks/RotateRectangle'
import RotateRectangle from './RotateRectangle'
import DragHandle from '../DragHandle'

describe.only('RotateRectangle tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <RotateRectangle
        mark={{
          x_center: 150,
          y_center: 150,
          width: 100,
          height: 100
        }}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render a rectangle with the coordinates provided', function () {
    const wrapper = shallow(
      <RotateRectangle
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />
    )
    expect(
      wrapper.containsMatchingElement(
        // x & y here are rect upper left corner
        // x = x_center - (width/2)
        // y = y_center - (height/2)
        <rect x={85} y={180} width={30} height={40} />
      )
    ).to.be.true()
  })

  it('should render an active rectangle with four drag handles', function () {
    const wrapper = mount(
      <RotateRectangle
        active
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />
    )
    expect(wrapper.find(DragHandle)).to.have.lengthOf(5)
  })

  it('should resize when the drag handles are moved', function () {
    const mark = RotateRectangleMark.create({
      id: 'rotateRectangle1',
      toolType: 'rotateRectangle',
      x_center: 100,
      y_center: 200,
      width: 30,
      height: 40
    })

    const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)

    const dragMove = wrapper
      .find(DragHandle)
      .find('[x=115][y=220][dragMove]')
      .prop('dragMove')
    expect(mark.x_center).to.equal(100)
    expect(mark.y_center).to.equal(200)
    expect(mark.width).to.equal(30)
    expect(mark.height).to.equal(40)

    dragMove({}, { x: 50, y: 20 })

    expect(mark.x_center).to.equal(125)
    expect(mark.y_center).to.equal(210)
    expect(mark.width).to.equal(80)
    expect(mark.height).to.equal(60)
  })
})
