import { shallow } from 'enzyme'
import React from 'react'

import Placeholder from './Placeholder'

let wrapper

describe('Component > Placeholder', function () {
  before(function () {
    wrapper = shallow(<Placeholder />)
  })

  it('should render without crashing', function () {})
})
