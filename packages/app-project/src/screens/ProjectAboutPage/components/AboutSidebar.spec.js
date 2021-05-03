import { shallow } from 'enzyme'
import React from 'react'

import AboutSidebar from './AboutSidebar'

describe('Component > AboutSidebar', () => {
  let wrapper
  before(function () {
    wrapper = shallow(<AboutSidebar navLinks={['research', 'team']} />)
  })

  // always render research and team
  // render only pages with content

  it('should render without crashing', () => {
    expect(wrapper).to.be.ok()
  })
})
