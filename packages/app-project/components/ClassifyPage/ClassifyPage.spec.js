import { shallow } from 'enzyme'
import React from 'react'

import ClassifyPage from './ClassifyPage'

let wrapper

describe('Component > ClassifyPage', function () {
  before(function () {
    wrapper = shallow(<ClassifyPage />)
  })

  it('should render without crashing', function () {})
})
