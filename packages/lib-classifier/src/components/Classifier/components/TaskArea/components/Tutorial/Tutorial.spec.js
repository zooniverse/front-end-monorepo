import { shallow } from 'enzyme'
import React from 'react'

import Tutorial from './Tutorial'

let wrapper

describe('Component > Tutorial', function () {
  before(function () {
    wrapper = shallow(<Tutorial />)
  })

  it('should render without crashing', function () {})
})
