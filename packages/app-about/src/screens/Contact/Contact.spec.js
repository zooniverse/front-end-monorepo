import { shallow } from 'enzyme'
import React from 'react'

import Contact from './Contact'

let wrapper

describe('Component > Contact', function () {
  before(function () {
    wrapper = shallow(<Contact />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
