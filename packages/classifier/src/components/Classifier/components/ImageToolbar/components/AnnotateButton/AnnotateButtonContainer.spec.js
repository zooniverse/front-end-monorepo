import { shallow } from 'enzyme'
import React from 'react'
import AnnotateButtonContainer from './AnnotateButtonContainer'

describe('Component > AnnotateButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<AnnotateButtonContainer />)
  })
})
