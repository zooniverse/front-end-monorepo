import { shallow } from 'enzyme'
import React from 'react'

import LightCurveViewerContainer from './LightCurveViewerContainer'

let wrapper

describe('Component > LightCurveViewerContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<LightCurveViewerContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no subject prop', function () {
    expect(wrapper.dive().type()).to.be.null
  })
})
