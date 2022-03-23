import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Circle from './Circle'
import { default as CircleMark } from '../../models/marks/Circle'
import DragHandle from '../DragHandle'

describe('Circle tool', function () {
  let mark
  beforeEach(function () {
    mark = CircleMark.create({
      id: 'circle1',
      toolType: 'circle',
      x_center: 200,
      y_center: 200,
      r: 50
    })
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<Circle mark={mark} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a circle with the coordinates provided', function () {
    const wrapper = shallow(<Circle mark={mark} scale={1} />)
    expect(wrapper.containsMatchingElement(<circle r={50} />)).to.be.true()
  })

  it('should render an active circle with one drag handle', function () {
    const wrapper = shallow(<Circle active mark={mark} scale={1} />)
    expect(wrapper.find(DragHandle)).to.have.lengthOf(1)
  })

  it('should change the radius when drag handle is moved', function () {
    const wrapper = mount(<Circle active mark={mark} scale={1} />)

    const dragMove = wrapper
      .find(DragHandle)
      .find('[x=50][y=0][dragMove]')
      .prop('dragMove')
    expect(mark.x_center).to.equal(200)
    expect(mark.y_center).to.equal(200)
    expect(mark.r).to.equal(50)

    console.log('mark.r: ', mark.r)
    dragMove({ x: 300, y: 200 })

    console.log('mark.r: ', typeof mark.r)

    expect(mark.x_center).to.equal(200)
    expect(mark.y_center).to.equal(200)
    expect(mark.r).to.equal(100)
  })
})
