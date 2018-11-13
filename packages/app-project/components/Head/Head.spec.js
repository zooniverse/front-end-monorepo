import { shallow } from 'enzyme'
import React from 'react'

import Head from './Head'

describe('Component > Head', function () {
  it('should render without crashing', function () {
    shallow(<Head />)
  })
})
