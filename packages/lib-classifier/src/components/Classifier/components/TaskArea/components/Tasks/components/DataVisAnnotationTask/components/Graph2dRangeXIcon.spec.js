import { shallow } from 'enzyme'
import React from 'react'

import Graph2dRangeXIcon from './Graph2dRangeXIcon'

let wrapper

describe('Component > Graph2dRangeXIcon', function () {
  before(function () {
    wrapper = shallow(<Graph2dRangeXIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
