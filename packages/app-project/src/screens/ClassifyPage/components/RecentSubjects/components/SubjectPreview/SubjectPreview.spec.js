import { shallow } from 'enzyme'
import React from 'react'

import SubjectPreview from './SubjectPreview'

let wrapper

describe('Component > SubjectPreview', function () {
  before(function () {
    wrapper = shallow(<SubjectPreview />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
