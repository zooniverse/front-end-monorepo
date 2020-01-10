import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewer from './SingleImageViewer'

let wrapper

describe('Component > SingleImageViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewer width={100} height={200} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
  it('should be upright', function () {
    const transform = wrapper.find('svg').prop('transform')
    expect(transform).to.have.string('rotate(0 0 0)')
  })

  describe('with a rotation angle', function () {
    beforeEach(function () {
      wrapper.setProps({ rotate: -90 })
    })

    it('should be rotated', function () {
    const transform = wrapper.find('svg').prop('transform')
    expect(transform).to.have.string('rotate(-90 0 0)')
    })
  })
})
