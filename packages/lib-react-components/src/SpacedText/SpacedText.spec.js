import React from 'react'
import { shallow } from 'enzyme'
import SpacedText from './SpacedText'

// Just a basic test, anything else?
// This component takes children, which should be strings? Test that children are rendered

describe('<SpacedText />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<SpacedText>Zooniverse</SpacedText>)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
