import { shallow } from 'enzyme'
import React from 'react'

import SingleColumnLayout from './SingleColumnLayout'

let wrapper

describe('Component > SingleColumnLayout', function () {
  before(function () {
    wrapper = shallow(<SingleColumnLayout />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
