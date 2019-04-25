import { shallow } from 'enzyme'
import React from 'react'

import Resources from './Resources'

let wrapper

describe('Component > Resources', function () {
  before(function () {
    wrapper = shallow(<Resources />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
