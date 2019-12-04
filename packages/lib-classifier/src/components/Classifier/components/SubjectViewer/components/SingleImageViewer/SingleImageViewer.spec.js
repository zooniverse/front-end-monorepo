import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewer from './SingleImageViewer'

let wrapper

describe('Component > SingleImageViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
