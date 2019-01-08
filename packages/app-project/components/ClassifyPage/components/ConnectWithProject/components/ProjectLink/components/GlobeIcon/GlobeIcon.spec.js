import { shallow } from 'enzyme'
import React from 'react'

import GlobeIcon from './GlobeIcon'

let wrapper

describe('Component > GlobeIcon', function () {
  before(function () {
    wrapper = shallow(<GlobeIcon />)
  })

  it('should render without crashing', function () {})
})
