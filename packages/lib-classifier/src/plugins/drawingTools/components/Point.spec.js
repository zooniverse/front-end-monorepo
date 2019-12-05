import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Point from './Point'

describe('Point tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Point
      mark={{ x: 100, y: 200 }}
    />)
    expect(wrapper).to.be.ok()
  })

  // it('should render with the coordinates provided', function () {
  //   const wrapper = shallow(
  //     <Point
  //       coordinates={{ x: 100, y: 200 }}
  //     />
  //   )
  //   console.log(wrapper.html())
  //   expect(wrapper.containsMatchingElement(
  //     <g transform={`translate(100, 200)`}>
  //       <line x1={0} y1={-4} x2={0} y2={-20} strokeWidth={1} />
  //       <line x1={-4} y1={0} x2={-20} y2={0} strokeWidth={1} />
  //       <line x1={0} y1={4} x2={0} y2={20} strokeWidth={1} />
  //       <line x1={4} y1={0} x2={20} y2={0} strokeWidth={1} />
  //       <circle r={10} />
  //     </g>
  //   )).to.be.true()
  // })

  it('should render with radius', function () {
    const wrapper = shallow(
      <Point
        mark={{ x: 100, y: 200 }}
      />)
    expect(wrapper.containsMatchingElement(<circle r={10} />)).to.be.true()
  })

  it('should render with selected radius if active', function () {
    const wrapper = shallow(
      <Point
        active
        mark={{ x: 100, y: 200 }}
      />)
    expect(wrapper.containsMatchingElement(<circle r={20} />)).to.be.true()
  })
})
