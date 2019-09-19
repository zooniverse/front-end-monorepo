import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Line from './Line'

describe('Line tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Line />)
    expect(wrapper).to.be.ok()
  })

  it('should render a line with the coordinates provided', function () {
    const wrapper = shallow(
      <Line
        coordinates={{ x1: 100, y1: 200, x2: 300, y2: 400 }}
      />)
    expect(wrapper.containsMatchingElement(<line x1={100} y1={200} x2={300} y2={400} />)).to.be.true()
  })

  it('should return null with coordinates undefined', function () {
    const wrapper = shallow(<Line />)
    expect(wrapper.isEmptyRender()).to.be.true()
  })
})
