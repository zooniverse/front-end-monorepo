import { shallow } from 'enzyme'
import React from 'react'
import CompletionBar from './CompletionBar'

describe('Component > CompletionBar', function () {
  it('should render without crashing', function () {
    shallow(<CompletionBar />)
  })
})
