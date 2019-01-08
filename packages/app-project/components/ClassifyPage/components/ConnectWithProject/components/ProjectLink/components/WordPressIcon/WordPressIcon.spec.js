import { shallow } from 'enzyme'
import React from 'react'

import WordPressIcon from './WordPressIcon'

let wrapper

describe('Component > WordPressIcon', function () {
  before(function () {
    wrapper = shallow(<WordPressIcon />)
  })

  it('should render without crashing', function () {})
})
