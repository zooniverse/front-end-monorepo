import { mount } from 'enzyme'
import { Button, CheckBox, TextInput } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import CreateCollection from './CreateCollection'

describe('Component > CreateCollection', function () {
  let wrapper
  const collection = { display_name: 'Test One', private: true }
  const onChange = sinon.stub()
  const onSubmit = sinon.stub()

  before(function () {
    // use mount because we're t4esting a component that uses refs
    wrapper = mount(
      <CreateCollection
        collection={collection}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  })

  afterEach(function () {
    onChange.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('collection name input', function () {
    let textInput

    before(function () {
      textInput = wrapper.find(TextInput)
    })

    it('should exist', function () {
      expect(textInput).to.have.lengthOf(1)
    })

    it('should display the collection name', function () {
      expect(textInput.prop('value')).to.equal(collection.display_name)
    })

    it('should call the onChange callback', function () {
      textInput.props().onChange()
      expect(onChange).to.have.been.calledOnceWith({ display_name: 'Test One', private: true })
    })
  })

  describe('private checkbox', function () {
    let checkbox

    before(function () {
      checkbox = wrapper.find(CheckBox)
    })

    it('should exist', function () {
      expect(checkbox).to.have.lengthOf(1)
    })

    it('should show the collection private status', function () {
      expect(checkbox.prop('checked')).to.equal(collection.private)
    })

    it('should call the onChange callback', function () {
      checkbox.props().onChange()
      expect(onChange).to.have.been.calledOnceWith({ display_name: 'Test One', private: true })
    })
  })

  describe('Add button', function () {
    let button

    before(function () {
      button = wrapper.find(Button)
    })

    it('should exist', function () {
      expect(button).to.have.lengthOf(1)
    })

    it('should call the onSubmit callback', function () {
      button.simulate('click')
      expect(onSubmit).to.have.been.calledOnce()
    })

    it('can be disabled', function () {
      wrapper.setProps({ disabled: true })
      button = wrapper.find(Button)
      expect(button.prop('disabled')).to.be.true()
    })
  })
})
