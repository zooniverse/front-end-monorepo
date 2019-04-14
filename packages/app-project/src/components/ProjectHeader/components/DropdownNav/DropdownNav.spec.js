import { shallow } from 'enzyme'
import React from 'react'

import DropdownNav from './DropdownNav'

let wrapper

describe('Component > Nav', function () {
  before(function () {
    wrapper = shallow(<DropdownNav />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a link for each item passed in the `navLinks` prop')
})
