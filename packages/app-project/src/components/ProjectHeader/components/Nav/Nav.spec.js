import { shallow } from 'enzyme'
import React from 'react'

import Nav from './Nav'

let wrapper

describe('Component > Nav', function () {
  before(function () {
    wrapper = shallow(<Nav />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
