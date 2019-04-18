import { shallow } from 'enzyme'
import React from 'react'

import Publication from './Publication'

let wrapper

describe('Component > Publication', function () {
  before(function () {
    wrapper = shallow(<Publication />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
