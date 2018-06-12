import { shallow } from 'enzyme'
import React from 'react'
import SingleImageViewer from './SingleImageViewer'

describe('Component > SingleImageViewer', function () {
  it('should render without crashing', function () {
    shallow(<SingleImageViewer />)
  })
})
