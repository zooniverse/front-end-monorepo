import { shallow } from 'enzyme'
import React from 'react'

import AboutSidebar from './AboutSidebar'

describe('Component > AboutSidebar', () => {
  let wrapper
  before(function () {
    wrapper = shallow(<AboutSidebar navLinks={['research', 'team']} />)
  })

  it('should render without crashing', () => {
    expect(wrapper).to.be.ok()
  })
})
