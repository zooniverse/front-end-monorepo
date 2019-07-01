import { shallow } from 'enzyme'
import React from 'react'

import ThemeModeToggleContainer from './ThemeModeToggleContainer'
import ThemeModeToggle from './ThemeModeToggle'

let wrapper
let componentWrapper

describe('Component > ThemeModeToggleContainer', function () {
  before(function () {
    wrapper = shallow(<ThemeModeToggleContainer.wrappedComponent />)
    componentWrapper = wrapper.find(ThemeModeToggle)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ThemeModeToggle` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
