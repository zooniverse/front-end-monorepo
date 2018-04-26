import { shallow } from 'enzyme'
import React from 'react'
import Index from './index'

describe('Page > Index', function () {
  it('should render without crashing', function () {
    shallow(<Index />)
  })
})
