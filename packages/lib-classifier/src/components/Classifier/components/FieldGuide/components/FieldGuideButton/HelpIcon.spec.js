import { shallow, mount } from 'enzyme'
import React from 'react'
import HelpIcon from './HelpIcon'

describe('Component > HelpIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<HelpIcon />)
    expect(wrapper).to.be.ok
  })
})
