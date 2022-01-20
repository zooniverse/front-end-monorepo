import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import SingleTextViewer from './SingleTextViewer'

const mockContent = 'test string'

let wrapper

describe('Component > SingleTextViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleTextViewer content={mockContent} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render content', function () {
    expect(wrapper.text()).to.equal(mockContent)
  })
})
