import { shallow } from 'enzyme'
import React from 'react'

import YourStats from './YourStats'

let wrapper

describe('Component > YourStats', function () {
  before(function () {
    wrapper = shallow(<YourStats />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
