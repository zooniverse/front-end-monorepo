import { shallow } from 'enzyme'
import React from 'react'

import LightCurveViewerContainer from './LightCurveViewerContainer'

let wrapper

describe('Component > LightCurveViewerContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<LightCurveViewerContainer />)
  })

  it('should render without crashing', function () {})

  it('should render null if there is no subject prop', function () {
    expect(wrapper.type()).to.equal(null)
  })
})
