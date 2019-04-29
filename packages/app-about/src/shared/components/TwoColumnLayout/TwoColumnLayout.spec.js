import { shallow } from 'enzyme'
import React from 'react'

import TwoColumnLayout from './TwoColumnLayout'

let wrapper

describe('Component > TwoColumnLayout', function () {
  before(function () {
    wrapper = shallow(<TwoColumnLayout />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
