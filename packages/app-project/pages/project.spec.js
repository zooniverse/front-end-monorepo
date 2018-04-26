import { shallow } from 'enzyme'
import React from 'react'
import Project from './project'

describe('Page > Project', function () {
  it('should render without crashing', function () {
    shallow(<Project />)
  })
})
