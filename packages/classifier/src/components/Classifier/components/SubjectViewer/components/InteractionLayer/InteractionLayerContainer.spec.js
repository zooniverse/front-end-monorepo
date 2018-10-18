import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

describe('Component > InteractionLayerContainer', function () {
  it('should render without crashing', function () {
    shallow(<InteractionLayerContainer />)
  })
})
