import React from 'react'
import { shallow } from 'enzyme'

import ZooFooter from './ZooFooter'

describe('<ZooFooter />', function () {
  let wrapper

  it('renders without crashing', function () {
    wrapper = shallow(<ZooFooter />)
    expect(wrapper).to.be.ok()
  })
})
