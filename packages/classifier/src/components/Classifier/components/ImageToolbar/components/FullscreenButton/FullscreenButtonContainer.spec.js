import { shallow } from 'enzyme'
import React from 'react'
import FullscreenButtonContainer from './FullscreenButtonContainer'

describe('Component > FullscreenButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<FullscreenButtonContainer />)
  })
})
