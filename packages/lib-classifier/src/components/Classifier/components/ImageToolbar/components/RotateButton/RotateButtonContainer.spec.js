import { shallow, mount } from 'enzyme'
import React from 'react'
import RotateButtonContainer from './RotateButtonContainer'

describe('Component > RotateButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<RotateButtonContainer />)
  })
})
