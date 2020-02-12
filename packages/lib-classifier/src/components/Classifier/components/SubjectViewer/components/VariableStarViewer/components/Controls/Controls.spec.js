import { shallow } from 'enzyme'
import React from 'react'
import Controls from './Controls'

describe('VariableStarViewer > Component > Controls', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Controls />)
    expect(wrapper).to.be.ok()
  })
})