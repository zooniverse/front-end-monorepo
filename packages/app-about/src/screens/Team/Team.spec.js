import { shallow } from 'enzyme'
import React from 'react'

import Team from './Team'

let wrapper

describe('Component > Team', function () {
  before(function () {
    wrapper = shallow(<Team />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
