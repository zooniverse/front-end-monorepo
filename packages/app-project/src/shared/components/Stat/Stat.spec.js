import { mount } from 'enzyme'
import React from 'react'

import Stat from './Stat'

let wrapper
const value = 123456
const label = 'Text label'

describe('Component > Stat', function () {
  before(function () {
    wrapper = mount(<Stat value={value} label={label} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `label` prop', function () {
    expect(wrapper.text()).to.contain(label)
  })

  it('should render the `value` prop', function () {
    expect(wrapper.text()).to.contain(value)
  })
})
