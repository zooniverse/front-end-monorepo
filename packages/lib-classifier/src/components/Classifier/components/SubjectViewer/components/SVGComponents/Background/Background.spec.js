import { shallow } from 'enzyme'
import React from 'react'

import Background from './Background'

describe('Component > Background', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Background />)
    expect(wrapper).to.be.ok()
  })

  it('should render a rect', function () {
    const wrapper = shallow(<Background />)
    expect(wrapper.find('rect')).to.have.lengthOf(1)
  })

  it('should pass along any other props', function () {
    const wrapper = shallow(<Background foo='bar' />)
    expect(wrapper.props().foo).to.equal('bar')
  })

  it('should set the fill color by prop', function () {
    const wrapper = shallow(<Background fill='black' />)
    expect(wrapper.props().fill).to.equal('black')
  })
})
