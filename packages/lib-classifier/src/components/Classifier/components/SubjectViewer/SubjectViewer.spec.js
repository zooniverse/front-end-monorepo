import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewer from './SubjectViewer'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    shallow(<SubjectViewer />)
  })
})
