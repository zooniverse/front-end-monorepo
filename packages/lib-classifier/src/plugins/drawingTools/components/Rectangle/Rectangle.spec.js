import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Rectangle from './Rectangle'
import { default as RectangleMark } from '../../models/marks/Rectangle'
import DragHandle from '../DragHandle'

describe('Rectangle tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Rectangle
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render a rectangle with the coordinates provided', function () {
    const wrapper = shallow(
      <Rectangle
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />
    )
    expect(
      wrapper.containsMatchingElement(
        <rect x={85} y={180} width={30} height={40} />
      )
    ).to.be.true()
  })

  it('should render an active rectangle with four drag handles', function () {
    const wrapper = mount(
      <Rectangle
        active
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
        scale={1}
      />
    )
    expect(wrapper.find(DragHandle)).to.have.lengthOf(4)
  })

  it('should resize when the drag handles are moved', function () {
    const mark = RectangleMark.create({
      id: 'rect1',
      toolType: 'rectangle',
      x_center: 100,
      y_center: 200,
      width: 30,
      height: 40
    })

    const wrapper = mount(<Rectangle active mark={mark} scale={1} />)

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
