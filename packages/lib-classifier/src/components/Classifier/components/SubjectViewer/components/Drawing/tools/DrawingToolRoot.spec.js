import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DrawingToolRoot from './DrawingToolRoot'
import Point from './Point'

describe('Root tool', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DrawingToolRoot><Point coordinates={{ x: 100, y: 200 }} /></DrawingToolRoot>)
    expect(wrapper).to.be.ok()
  })

  it('should render a child drawing tool', function () {
    const wrapper = shallow(<DrawingToolRoot><Point coordinates={{ x: 100, y: 200 }} /></DrawingToolRoot>)
    expect(wrapper.find(Point)).to.have.lengthOf(1)
  })
})
