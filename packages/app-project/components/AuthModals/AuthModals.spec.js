import { shallow } from 'enzyme'
import React from 'react'

import AuthModals from './AuthModals'

let wrapper

describe('Component > AuthModals', function () {
  before(function () {
    wrapper = shallow(<AuthModals />)
  })

  it('should render without crashing', function () {})
})
