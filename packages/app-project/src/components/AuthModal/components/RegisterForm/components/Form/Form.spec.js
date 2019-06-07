import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { CheckBox, TextInput, Text } from 'grommet'
import {
  userNameFieldId,
  passwordFieldId,
  passwordConfirmFieldId,
  emailFieldId,
  emailConfirmFieldId,
  realNameFieldId,
  privacyAgreementFieldId,
  emailListSignUpFieldId,
  betaListSignUpFieldId,
  underageWithParentFieldId,
  Form
} from './Form'
import en from '../../locales/en'

describe('Component > Form', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Form />)
    expect(wrapper).to.be.ok()
  })

  describe('fields', function () {
    let rendered

    before(function () {
      const wrapper = shallow(<Form />)
      rendered = wrapper.render()
    })

    it('should have a username field', function () {
      const input = rendered.find('[name="username"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('text')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have a password field', function () {
      const input = rendered.find('[name="password"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('password')
      expect(input.attr('required')).to.equal('required')
      expect(input.prop('minlength')).to.equal('8')
    })

    it('should have a passwordConfirm field', function () {
      const input = rendered.find('[name="passwordConfirm"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('password')
      expect(input.attr('required')).to.equal('required')
      expect(input.prop('minlength')).to.equal('8')
    })

    it('should have an email field', function () {
      const input = rendered.find('[name="email"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('email')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have an emailConfirm field', function () {
      const input = rendered.find('[name="emailConfirm"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('email')
      expect(input.attr('required')).to.equal('required')
    })

    it('should have a realName field', function () {
      const input = rendered.find('[name="realName"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('text')
      expect(input.attr('required')).to.be.undefined()
    })

    it('should have a privacyAgreement field', function () {
      const input = rendered.find('[name="privacyAgreement"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('checkbox')
      expect(input.attr('required')).to.be.equal('required')
    })

    it('should have a emailListSignUp field', function () {
      const input = rendered.find('[name="emailListSignUp"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('checkbox')
      expect(input.attr('required')).to.be.undefined()
    })

    it('should have a betaListSignUp field', function () {
      const input = rendered.find('[name="betaListSignUp"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('checkbox')
      expect(input.attr('required')).to.be.undefined()
    })

    it('should have a underageWithParent field', function () {
      const input = rendered.find('[name="underageWithParent"]')
      expect(input).to.have.lengthOf(1)
      expect(input.attr('type')).to.equal('checkbox')
      expect(input.attr('required')).to.be.undefined()
    })
  })

  describe('when being edited', function () {
    it('should call onChangeEvent on the inputs', function () {
      const onChangeEventSpy = sinon.spy()
      const wrapper = shallow(<Form onChangeEvent={onChangeEventSpy} />)
      const textInputs = wrapper.find(TextInput)
      const checkboxes = wrapper.find(CheckBox)

      textInputs.forEach((input) => {
        input.simulate('change')
        expect(onChangeEventSpy).to.have.been.calledOnce
        onChangeEventSpy.resetHistory()
      })

      checkboxes.forEach((checkbox) => {
        checkbox.simulate('change')
        expect(onChangeEventSpy).to.have.been.calledOnce()
        onChangeEventSpy.resetHistory()
      })
    })

    it('should call onBlurEvent on the inputs', function () {
      const onBlurEventSpy = sinon.spy()
      const wrapper = shallow(<Form onBlurEvent={onBlurEventSpy} />)
      const textInputs = wrapper.find(TextInput)
      const checkboxes = wrapper.find(CheckBox)

      textInputs.forEach((input) => {
        input.simulate('blur')
        expect(onBlurEventSpy).to.have.been.calledOnce
        onBlurEventSpy.resetHistory()
      })

      checkboxes.forEach((checkbox) => {
        checkbox.simulate('blur')
        expect(onBlurEventSpy).to.have.been.calledOnce()
        onBlurEventSpy.resetHistory()
      })
    })

    it('should update the values on props change', function () {
      const wrapper = shallow(<Form />)
      const values = {
        betaListSignUp: true,
        email: 'foo@bar.com',
        emailConfirm: 'foo@bar.com',
        emailListSignUp: true,
        password: 'password',
        passwordConfirm: 'password',
        privacyAgreement: true,
        realName: 'Jane Doe',
        username: 'ilovezooniverse',
        underageWithParent: true
      }
      wrapper.setProps({ values })

      // checkboxes
      expect(wrapper.find({ id: betaListSignUpFieldId }).props().checked).to.be.true()
      expect(wrapper.find({ id: emailListSignUpFieldId }).props().checked).to.be.true()
      expect(wrapper.find({ id: privacyAgreementFieldId }).props().checked).to.be.true()
      expect(wrapper.find({ id: underageWithParentFieldId }).props().checked).to.be.true()

      // text inputs
      expect(wrapper.find({ id: emailFieldId }).props().value).to.equal(values.email)
      expect(wrapper.find({ id: emailConfirmFieldId }).props().value).to.equal(values.emailConfirm)
      expect(wrapper.find({ id: passwordFieldId }).props().value).to.equal(values.password)
      expect(wrapper.find({ id: passwordConfirmFieldId }).props().value).to.equal(values.passwordConfirm)
      expect(wrapper.find({ id: realNameFieldId }).props().value).to.equal(values.realName)
      expect(wrapper.find({ id: userNameFieldId }).props().value).to.equal(values.username)
    })

    it('should set validation error messages on inputs that are javascript validated', function () {
      const wrapper = shallow(<Form />)
      const errors = {
        email: 'Already taken',
        emailConfirm: 'Does not match',
        passwordConfirm: 'Does not match',
        privacyAgreement: 'Must be checked',
        username: 'Already taken'
      }

      wrapper.setProps({ errors })

      expect(wrapper.find({ htmlFor: emailFieldId }).props().error).to.equal(errors.email)
      expect(wrapper.find({ htmlFor: emailConfirmFieldId }).props().error).to.equal(errors.emailConfirm)
      expect(wrapper.find({ htmlFor: passwordConfirmFieldId }).props().error).to.equal(errors.passwordConfirm)
      expect(wrapper.find({ htmlFor: userNameFieldId }).props().error).to.equal(errors.username)
    })
  })

  describe('when the under 16 checkbox is toggled', function () {
    it('should show field labels for over 16 registrants when the checkbox is unchecked', function () {
      const wrapper = shallow(<Form />)

      expect(wrapper.find({ htmlFor: userNameFieldId }).props().help).equal(en.RegisterForm.usernameHelp)
      expect(wrapper.find({ id: privacyAgreementFieldId }).props().label.props.children[0]).equal(en.RegisterForm.privacyAgreement)
      expect(wrapper.find({ id: emailListSignUpFieldId }).props().label.props.children).equal(en.RegisterForm.emailListSignUp)
      expect(wrapper.find({ htmlFor: emailFieldId }).props().label.props.children).equal(en.RegisterForm.email)
    })

    it('should show field labels for under 16 registrants when the checkbox is checked', function () {
      const wrapper = shallow(<Form />)
      wrapper.setProps({ values: { underageWithParent: true } })

      expect(wrapper.find({ htmlFor: userNameFieldId }).props().help).equal(en.RegisterForm.underageNotRealName)
      expect(wrapper.find({ id: privacyAgreementFieldId }).props().label.props.children[0]).equal(en.RegisterForm.underageConsent)
      expect(wrapper.find({ id: emailListSignUpFieldId }).props().label.props.children).equal(en.RegisterForm.underageEmailSignUp)
      expect(wrapper.find({ htmlFor: emailFieldId }).props().label.props.children).equal(en.RegisterForm.underageEmail)
    })
  })

  describe('when submitting', function () {
    it('should call onSubmitEvent', function () {
      const onSubmitEventSpy = sinon.spy()
      const wrapper = shallow(<Form onSubmitEvent={onSubmitEventSpy} />)
      wrapper.simulate('submit')
      expect(onSubmitEventSpy).to.have.been.calledOnce
    })

    it('should disable all of the inputs and the submit button', function () {
      const wrapper = shallow(<Form />)
      wrapper.setProps({ isSubmitting: true })
      const textInputs = wrapper.find(TextInput)
      const checkboxes = wrapper.find(CheckBox)
      const submitButton = wrapper.find({ type: 'submit' })

      textInputs.forEach((input) => {
        expect(input.props().disabled).to.be.true()
      })

      checkboxes.forEach((checkbox) => {
        expect(checkbox.props().disabled).to.be.true()
      })

      expect(submitButton.props().disabled).to.be.true()
    })
  })
})
