import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayer from './InteractionLayer'

describe('Component > InteractionLayer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayer />)
  })
})
