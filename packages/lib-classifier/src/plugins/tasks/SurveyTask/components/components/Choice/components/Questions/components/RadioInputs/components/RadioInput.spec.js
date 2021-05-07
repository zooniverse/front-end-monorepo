import { shallow } from 'enzyme'
import { Box, Text } from 'grommet'
import React from 'react'

import RadioInput from './RadioInput'

describe('Component > RadioInput', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <RadioInput
        check={false}
        label='True'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    expect(wrapper.find(Text).text()).to.equal('True')
  })

  it('should have a background color neutral-6', function () {
    expect(wrapper.find(Box).props().background.color).to.equal('neutral-6')
  })

  it('should have text weight normal', function () {
    expect(wrapper.find(Text).props().weight).to.equal('normal')
  })

  describe('when checked', function () {
    before(function () {
      wrapper.setProps({ checked: true })
    })

    it('should have a background color of accent-2', function () {
      expect(wrapper.find(Box).props().background.color).to.equal('accent-2')
    })

    it('should have text weight bold', function () {
      expect(wrapper.find(Text).props().weight).to.equal('bold')
    })
  })
})
