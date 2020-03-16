import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Grommet, TextInput } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import {
  userNameFieldId,
  passwordFieldId,
  Form
} from './Form'

describe('LoginForm > Component > Form', function () {
  const shallowOptions = { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } }
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Form />,
      shallowOptions
    )
    expect(wrapper).to.be.ok()
  })

  describe('fields', function () {
    let rendered

    before(function () {
      const wrapper = mount(
        <Form />,
        { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
      )
      rendered = wrapper.render()
    })

    it('should have a login field', function () {
      const input = rendered.find('[name="login"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('text')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have a password field', function () {
      const input = rendered.find('[name="password"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('password')
      expect(input.attr('required')).to.equal('required')
    })
  })

  describe('when being edited', function () {
    it('should call handleChange on the inputs', function () {
      const handleChangeSpy = sinon.spy()
      const wrapper = shallow(
        <Form handleChange={handleChangeSpy} />,
        shallowOptions
      )
      const textInputs = wrapper.find(TextInput)

      textInputs.forEach((input) => {
        input.simulate('change')
        expect(handleChangeSpy).to.have.been.calledOnce()
        handleChangeSpy.resetHistory()
      })
    })

    it('should call handleBlur on the inputs', function () {
      const handleBlurSpy = sinon.spy()
      const wrapper = shallow(
        <Form handleBlur={handleBlurSpy} />,
        shallowOptions
      )
      const textInputs = wrapper.find(TextInput)

      textInputs.forEach((input) => {
        input.simulate('blur')
        expect(handleBlurSpy).to.have.been.calledOnce()
        handleBlurSpy.resetHistory()
      })
    })

    it('should update the values on props change', function () {
      const wrapper = shallow(
        <Form />,
        shallowOptions
      )
      const values = {
        login: 'ZooFan',
        password: 'password'
      }
      wrapper.setProps({ values })

      // text inputs
      expect(wrapper.find({ id: userNameFieldId }).props().value).to.equal(values.login)
      expect(wrapper.find({ id: passwordFieldId }).props().value).to.equal(values.password)
    })
  })

  describe('when submitting', function () {
    it('should call handleSubmit', function () {
      const handleSubmitSpy = sinon.spy()
      const wrapper = shallow(
        <Form handleSubmit={handleSubmitSpy} />,
        shallowOptions
      )
      wrapper.simulate('submit')
      expect(handleSubmitSpy).to.have.been.calledOnce()
    })

    it('should disable all of the inputs and the submit button', function () {
      const wrapper = shallow(
        <Form />,
        shallowOptions
      )
      wrapper.setProps({ isSubmitting: true })
      const textInputs = wrapper.find(TextInput)
      const submitButton = wrapper.find({ type: 'submit' })

      textInputs.forEach((input) => {
        expect(input.props().disabled).to.be.true()
      })

      expect(submitButton.props().disabled).to.be.true()
    })
  })
})
