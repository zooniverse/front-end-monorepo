import { shallow } from 'enzyme'
import React from 'react'

import Publications from './Publications'

let wrapper

describe('Component > Publications', function () {
  before(function () {
    wrapper = shallow(<Publications />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
