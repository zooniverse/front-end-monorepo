import { shallow } from 'enzyme'
import React from 'react'

import StandardLayout from './StandardLayout'

let wrapper

describe('Component > StandardLayout', function () {
  before(function () {
    wrapper = shallow(<StandardLayout />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
