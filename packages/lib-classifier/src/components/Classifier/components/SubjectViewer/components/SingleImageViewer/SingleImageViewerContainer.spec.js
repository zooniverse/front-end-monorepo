import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewerContainer from './SingleImageViewerContainer'

let wrapper

describe.only('Component > SingleImageViewerContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewerContainer />)
  })

  it('should render without crashing', function () {})

  it('should render null if there is no subject prop', function () {
    expect(wrapper.type()).to.equal(null)
  })
})
