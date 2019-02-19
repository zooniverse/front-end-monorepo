import { shallow } from 'enzyme'
import React from 'react'

import Navigation from './Navigation'

describe('Component > Navigation', function () {
  it('should render without crashing', function () {
    shallow(<Navigation />)
  })
})
