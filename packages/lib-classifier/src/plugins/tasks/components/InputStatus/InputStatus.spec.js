import React from 'react'
import { shallow } from 'enzyme'
import InputStatus, { StyledInputStatus } from './InputStatus'
/** The translation function will simply return keys in a testing env */

describe('InputStatus', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper).to.be.ok()
  })

  it('should render a StyledInputStatus component', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper.find(StyledInputStatus)).to.have.lengthOf(1)
  })

  it('should not render any requirements if props.tool.min or props.tool.max is not defined', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper.contains('InputStatus.drawn')).to.be.true()
  })

  it('should render minimum drawing requirements if props.tool.min is defined', function () {
    const wrapper = shallow(<InputStatus tool={{ min: 1 }} />)
    expect(wrapper.contains('InputStatus.min')).to.be.true()
  })

  it('should render maxmimum drawing requirements if props.tool.max is defined', function () {
    const wrapper = shallow(<InputStatus tool={{ max: 2 }} />)
    expect(wrapper.contains('InputStatus.max')).to.be.true()
  })

  it('should render minimum and maxmimum drawing requirements if props.tool.min and props.tool.max are defined', function () {
    const wrapper = shallow(<InputStatus tool={{ min: 1, max: 2 }} />)
    expect(wrapper.contains('InputStatus.maxAndMin')).to.be.true()
  })
})
