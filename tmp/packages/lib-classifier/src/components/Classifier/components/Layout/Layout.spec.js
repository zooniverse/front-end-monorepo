import { shallow } from 'enzyme'
import React from 'react'

import Layout from './Layout'

describe('Component > Layout', function () {
  it('should render without crashing', function () {
    shallow(<Layout.wrappedComponent />)
  })
})
