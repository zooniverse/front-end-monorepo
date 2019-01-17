import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewerContainer from './SingleImageViewerContainer'

let wrapper

describe('Component > SingleImageViewerContainer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewerContainer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render null if there is no subject prop', function () {
    expect(wrapper.type()).to.equal(null)
  })
})
