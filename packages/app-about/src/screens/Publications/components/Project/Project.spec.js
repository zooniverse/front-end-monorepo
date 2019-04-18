import { shallow } from 'enzyme'
import React from 'react'

import Project from './Project'

let wrapper

describe('Component > Project', function () {
  before(function () {
    wrapper = shallow(<Project />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
