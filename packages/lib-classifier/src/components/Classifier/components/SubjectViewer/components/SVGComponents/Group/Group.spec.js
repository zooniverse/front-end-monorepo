import { shallow } from 'enzyme'
import React from 'react'

import Group from './Group'

describe('Component > Group', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Group><span /></Group>)
    expect(wrapper).to.be.ok()
  })

  it('should render an svg group', function () {
    const wrapper = shallow(<Group><span /></Group>)
    expect(wrapper.find('g')).to.have.lengthOf(1)
  })

  it('should render children', function () {
    const wrapper = shallow(<Group><span /></Group>)
    expect(wrapper.children()).to.have.lengthOf(1)
  })

  it('should pass along any other props', function () {
    const wrapper = shallow(<Group foo='bar'><span /></Group>)
    expect(wrapper.props().foo).to.equal('bar')
  })
})