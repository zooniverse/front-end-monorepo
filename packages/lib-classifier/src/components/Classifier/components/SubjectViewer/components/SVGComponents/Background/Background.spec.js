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

  it('should set the stroke properties if a borderColor is defined', function () {
    const wrapper = shallow(<Background fill='black' />)
    expect(wrapper.props().stroke).to.be.empty()
    expect(wrapper.props().strokeWidth).to.be.equal(0)
    wrapper.setProps({ borderColor: '#ffffff' })
    expect(wrapper.props().stroke).to.equal('#ffffff')
    expect(wrapper.props().strokeWidth).to.be.equal(1)
  })
})
