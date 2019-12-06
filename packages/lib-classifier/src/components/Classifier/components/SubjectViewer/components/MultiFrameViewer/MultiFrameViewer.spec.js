import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import MultiFrameViewer from './MultiFrameViewer'

describe('Component > MultiFrameViewer', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<MultiFrameViewer />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
