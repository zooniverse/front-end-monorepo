import { shallow } from 'enzyme'
import React from 'react'
import ClassifyBox from './ClassifyBox'

describe('Component > ClassifyBox', function () {
  it('should render without crashing', function () {
    shallow(<ClassifyBox />)
  })
})
