import { shallow } from 'enzyme'
import React from 'react'

import ProjectHeader from './ProjectHeader'

let wrapper

describe('Component > ProjectHeader', function () {
  before(function () {
    wrapper = shallow(<ProjectHeader />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
