import { shallow } from 'enzyme'
import React from 'react'
import Button from './Button'

describe('Component > Button', function () {
  it('should render without crashing', function () {
    shallow(<Button />)
  })
})