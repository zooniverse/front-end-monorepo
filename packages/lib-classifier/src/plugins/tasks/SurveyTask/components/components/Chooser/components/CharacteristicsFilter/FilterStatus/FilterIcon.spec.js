import React from 'react'
import { shallow } from 'enzyme'
import FilterIcon from './FilterIcon'

describe('Component > FilterIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FilterIcon />)
    expect(wrapper).to.be.ok()
  })
})
