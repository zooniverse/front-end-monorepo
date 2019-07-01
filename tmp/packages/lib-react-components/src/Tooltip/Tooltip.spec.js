import React from 'react'
import { shallow } from 'enzyme'

import Tooltip from './Tooltip'

describe('<Tooltip />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<Tooltip target={{}}>Helpful tips!</Tooltip>)
  })

  it('renders without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
