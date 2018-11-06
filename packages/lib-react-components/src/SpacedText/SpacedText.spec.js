import React from 'react'
import { shallow } from 'enzyme'
import SpacedText from './SpacedText'

describe('<SpacedText />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<SpacedText>Zooniverse</SpacedText>)
  })

  it('renders without crashing', function () {})
})
