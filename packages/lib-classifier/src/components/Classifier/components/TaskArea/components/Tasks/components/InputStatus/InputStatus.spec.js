import React from 'react'
import { shallow } from 'enzyme'
import InputStatus, { StyledInputStatus } from './InputStatus'

describe('InputStatus', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper).to.be.ok
  })

  it('should render a StyledInputStatus component', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper.find(StyledInputStatus)).to.have.lengthOf(1)
  })

  it('should not render any requirements if props.tool.min or props.tool.max is not defined', function () {
    const wrapper = shallow(<InputStatus />)
    expect(wrapper.find('span')).to.have.lengthOf(0)
  })

  it('should render minimum drawing requirements if props.tool.min is defined', function () {
    const wrapper = shallow(<InputStatus tool={{ min: 1 }} />)
    expect(wrapper.find('span')).to.have.lengthOf(1)
    expect(wrapper.text()).to.equal('0 of 1 required drawn')
  })

  it('should render maxmimum drawing requirements if props.tool.max is defined', function () {
    const wrapper = shallow(<InputStatus tool={{ max: 2 }} />)
    expect(wrapper.find('span')).to.have.lengthOf(1)
    expect(wrapper.text()).to.equal('0 of 2 maximum drawn')
  })

  it('should render minimum and maxmimum drawing requirements if props.tool.min and props.tool.max are defined', function () {
    const wrapper = shallow(<InputStatus tool={{ min: 1, max: 2 }} />)
    expect(wrapper.find('span')).to.have.lengthOf(2)
    expect(wrapper.text()).to.equal('0 of 1 required, 2 maximum drawn')
  })
})
