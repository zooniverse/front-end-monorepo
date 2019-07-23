import { shallow } from 'enzyme'
import React from 'react'

import Bar from './Bar'

describe('Component > Bar', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Bar height={30} index={0} width={10} x={1} y={2} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a rect', function () {
    const wrapper = shallow(<Bar height={30} index={0} width={10} x={1} y={2} />)
    expect(wrapper.find('rect')).to.have.lengthOf(1)
  })

  it('should set the fill color by prop', function () {
    const wrapper = shallow(<Bar fill='orange' height={30} index={0} width={10} x={1} y={2} />)
    expect(wrapper.props().fill).to.equal('orange')
  })

  it('should pass along any other props', function () {
    const wrapper = shallow(<Bar foo='bar' height={30} index={0} width={10} x={1} y={2} />)
    expect(wrapper.props().foo).to.equal('bar')
  })
})