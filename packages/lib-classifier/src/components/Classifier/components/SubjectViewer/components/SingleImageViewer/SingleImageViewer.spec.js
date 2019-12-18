import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewer from './SingleImageViewer'

let wrapper

describe('Component > SingleImageViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
  it('should be upright', function () {
    const transform = wrapper.root().prop('transform')
    expect(transform).to.have.string('rotate(0)')
  })

  describe('with a rotation angle', function () {
    beforeEach(function () {
      wrapper.setProps({ rotate: -90 })
    })

    it('should be rotated', function () {
    const transform = wrapper.root().prop('transform')
    expect(transform).to.have.string('rotate(-90)')
    })
  })
})
