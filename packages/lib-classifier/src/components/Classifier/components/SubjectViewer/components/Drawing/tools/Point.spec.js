import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Point from './Point'

describe('Point tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Point mark={{ x: 100, y: 200 }} />)
    expect(wrapper).to.be.ok()
  })

  it('should render with radius', function () {
    const wrapper = shallow(
      <Point
        active={false}
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
