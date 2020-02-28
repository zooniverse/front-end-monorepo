import { shallow } from 'enzyme'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { VariableStarViewer } from './VariableStarViewer'

describe('Component > VariableStarViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewer />)
    expect(wrapper).to.be.ok()
  })
})