import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Rectangle from './Rectangle'

describe('Rectangle tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Rectangle
      mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
    />)
    expect(wrapper).to.be.ok()
  })

  it('should render a line with the coordinates provided', function () {
    const wrapper = shallow(
      <Rectangle
        mark={{ x_center: 100, y_center: 200, width: 30, height: 40 }}
      />)
    expect(wrapper.containsMatchingElement(<rect x={85} y={180} width={30} height={40} />)).to.be.true()
  })
})
