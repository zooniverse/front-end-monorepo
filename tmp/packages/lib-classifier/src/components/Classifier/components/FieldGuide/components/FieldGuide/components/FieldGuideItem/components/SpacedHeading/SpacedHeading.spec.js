import { shallow } from 'enzyme'
import React from 'react'

import SpacedHeading from './SpacedHeading'

let wrapper

const MOCK_PROPS = {
  children: 'Foobar',
  level: '1'
}

describe('Component > SpacedHeading', function () {
  before(function () {
    wrapper = shallow(<SpacedHeading {...MOCK_PROPS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
