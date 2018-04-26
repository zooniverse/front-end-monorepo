import { shallow } from 'enzyme'
import React from 'react'
import Nav from './nav'

describe('Component > Nav', function () {
  it('should render without crashing', function () {
    shallow(<Nav />)
  })
})
