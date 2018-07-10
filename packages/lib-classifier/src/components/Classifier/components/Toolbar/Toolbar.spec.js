import { shallow } from 'enzyme'
import React from 'react'
import Toolbar from './Toolbar'

describe('Component > Toolbar', function () {
  it('should render without crashing', function () {
    shallow(<Toolbar />)
  })
})
