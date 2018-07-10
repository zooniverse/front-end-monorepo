import { shallow } from 'enzyme'
import React from 'react'
import ImageToolbar from './ImageToolbar'

describe('Component > ImageToolbar', function () {
  it('should render without crashing', function () {
    shallow(<ImageToolbar />)
  })
})
