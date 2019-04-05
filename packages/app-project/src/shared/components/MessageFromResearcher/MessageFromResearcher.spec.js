import { shallow } from 'enzyme'
import React from 'react'

import MessageFromResearcher from './MessageFromResearcher'

describe('Component > MessageFromResearcher', function() {
  let wrapper

  before(function() {
    wrapper = shallow(<MessageFromResearcher />)
  })

  it('should render without crashing', function() {
    expect(wrapper).to.be.ok()
  })
})
