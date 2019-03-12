import { shallow } from 'enzyme'
import React from 'react'
import ZoomInButtonContainer from './ZoomInButtonContainer'

describe('Component > ZoomInButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<ZoomInButtonContainer.wrappedComponent />)
  })
})
