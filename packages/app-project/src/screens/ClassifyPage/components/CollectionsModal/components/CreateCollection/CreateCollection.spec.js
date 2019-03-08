import { shallow } from 'enzyme'
import { Button, CheckBox, TextInput } from 'grommet'
import React from 'react'

import CreateCollection from './CreateCollection'

let wrapper

describe('Component > CreateCollection', function () {
  before(function () {
    wrapper = shallow(<CreateCollection />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should contain a text input to create new collections by name', function () {
    const textInput = wrapper.find(TextInput)
    expect(textInput).to.have.lengthOf(1)
  })

  it('should contain a checkbox to create new private collections', function () {
    const checkbox = wrapper.find(CheckBox)
    expect(checkbox).to.have.lengthOf(1)
  })

  it('should contain a button', function () {
    const button = wrapper.find(Button)
    expect(button).to.have.lengthOf(1)
  })
})
