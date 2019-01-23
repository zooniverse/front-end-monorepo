import React from 'react'
import { shallow } from 'enzyme'
import SlideTutorial from './SlideTutorial'

describe.only('SlideTutorial', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent />)
    expect(wrapper).to.be.ok
  })
})
