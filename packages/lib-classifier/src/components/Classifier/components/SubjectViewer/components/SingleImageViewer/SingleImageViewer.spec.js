import { shallow } from 'enzyme'
import React from 'react'
import SingleImageViewer from './ImageViewer'

describe('Component > ImageViewer', function () {
  it('should render without crashing', function () {
    shallow(<SingleImageViewer />)
  })
})
