import React from 'react'
import { shallow } from 'enzyme'
import MetaTools from './MetaTools'

describe('MetaTools', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetaTools.wrappedComponent />)
    expect(wrapper).to.be.ok
  })
})