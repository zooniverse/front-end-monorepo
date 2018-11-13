import { shallow } from 'enzyme'
import React from 'react'

import Stat from './Stat'
import AnimatedNumber from './components/AnimatedNumber'

let wrapper
const value = 123456
const label = 'Text label'

describe('Component > Stat', function () {
  before(function () {
    wrapper = shallow(<Stat value={value} label={label} />)
  })

  it('should render without crashing', function () {})

  it('should pass the `value` prop to an `AnimatedNumber`', function () {
    const animatedNumber = wrapper.find(AnimatedNumber)
    expect(animatedNumber.length).to.equal(1)
    expect(animatedNumber.prop('value')).to.equal(value)
  })

  it('should render the `label` prop', function () {
    expect(wrapper.text()).to.contain(label)
  })
})
