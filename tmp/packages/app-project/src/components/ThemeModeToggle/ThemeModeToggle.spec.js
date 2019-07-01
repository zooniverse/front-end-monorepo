import { shallow } from 'enzyme'
import React from 'react'

import ThemeModeToggle from './ThemeModeToggle'

let wrapper

describe('Component > ThemeModeToggle', function () {
  before(function () {
    wrapper = shallow(<ThemeModeToggle />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
