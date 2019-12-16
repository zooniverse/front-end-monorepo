import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import FrameCarousel from './FrameCarousel'

describe('Component > FrameCarousel', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<FrameCarousel />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
