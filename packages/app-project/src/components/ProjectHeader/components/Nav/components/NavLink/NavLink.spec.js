import { shallow } from 'enzyme'
import React from 'react'

import NavLink from './NavLink'

let wrapper

describe('Component > NavLink', function () {
  before(function () {
    wrapper = shallow(<NavLink />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
