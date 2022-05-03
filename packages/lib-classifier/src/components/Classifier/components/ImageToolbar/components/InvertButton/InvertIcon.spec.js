import React from 'react'
import { shallow } from 'enzyme'
import InvertIcon from './InvertIcon'

describe('Component > InvertIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InvertIcon />)
    expect(wrapper).to.be.ok()
  })
})
