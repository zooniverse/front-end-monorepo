import { shallow, mount } from 'enzyme'
import React from 'react'
import ResetButtonContainer from './ResetButtonContainer'

describe('Component > ResetButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<ResetButtonContainer />)
  })
})
