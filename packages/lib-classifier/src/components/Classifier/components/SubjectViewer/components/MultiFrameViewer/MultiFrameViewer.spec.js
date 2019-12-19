import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import MultiFrameViewer from './MultiFrameViewer'

describe('Component > MultiFrameViewer', function () {
  let wrapper

  beforeEach(function () {
    const subject = {
      id: 'test',
      locations: [
        { 'image/jpeg': 'https://some.domain/image.jpg' },
        { 'image/jpeg': 'https://some.domain/image.jpg' },
        { 'image/jpeg': 'https://some.domain/image.jpg' }
      ],
      metadata: {
        default_frame: "0"
      }
    }
    wrapper = shallow(<MultiFrameViewer subject={subject} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
