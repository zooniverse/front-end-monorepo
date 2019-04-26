import { shallow } from 'enzyme'
import React from 'react'

import About from './About'

let wrapper

describe('Component > About', function () {
  before(function () {
    wrapper = shallow(<About />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
