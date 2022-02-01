import { shallow } from 'enzyme'
import React from 'react'

import mockStore from '@test/mockStore'
import Layout from './Layout'

describe('Component > Layout', function () {
  it('should render without crashing', function () {
    shallow(<Layout store={mockStore()} />)
  })
})
