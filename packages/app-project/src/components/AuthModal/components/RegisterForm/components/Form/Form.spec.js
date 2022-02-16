import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { CheckBox, Grommet, TextInput } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
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

describe('RegisterForm > Component > Form', function () {
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
    it('should call handleChange on the inputs', function () {
      const handleChangeSpy = sinon.spy()
      const wrapper = shallow(
        <Form handleChange={handleChangeSpy} />,
        shallowOptions
      )
      const textInputs = wrapper.find(TextInput)
      const checkboxes = wrapper.find(CheckBox)

      textInputs.forEach((input) => {
        input.simulate('change')
        expect(handleChangeSpy).to.have.been.calledOnce()
        handleChangeSpy.resetHistory()
      })

      checkboxes.forEach((checkbox) => {
        checkbox.simulate('change')
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
      const checkboxes = wrapper.find(CheckBox)

      textInputs.forEach((input) => {
        input.simulate('blur')
        expect(handleBlurSpy).to.have.been.calledOnce()
        handleBlurSpy.resetHistory()
      })

      checkboxes.forEach((checkbox) => {
        checkbox.simulate('blur')
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
      const wrapper = shallow(
        <Form />,
        shallowOptions
      )
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
      const wrapper = shallow(
        <Form />,
        shallowOptions
      )
      /** The translation function t is set to simply return keys in a testing environment **/
      expect(wrapper.find({ htmlFor: userNameFieldId }).props().help).equal('AuthModal.RegisterForm.usernameHelp')
      expect(wrapper.find({ id: privacyAgreementFieldId }).props().label.props.children[0]).equal('AuthModal.RegisterForm.privacyAgreement')
      expect(wrapper.find({ id: emailListSignUpFieldId }).props().label.props.children).equal('AuthModal.RegisterForm.emailListSignUp')
      expect(wrapper.find({ htmlFor: emailFieldId }).props().label.props.children).equal('AuthModal.RegisterForm.email')
    })

    it('should show field labels for under 16 registrants when the checkbox is checked', function () {
      const wrapper = shallow(
        <Form />,
        shallowOptions
      )
      wrapper.setProps({ values: { underageWithParent: true } })

      /** The translation function t is set to simply return keys in a testing environment **/
      expect(wrapper.find({ htmlFor: userNameFieldId }).props().help).equal('AuthModal.RegisterForm.underageNotRealName')
      expect(wrapper.find({ id: privacyAgreementFieldId }).props().label.props.children[0]).equal('AuthModal.RegisterForm.underageConsent')
      expect(wrapper.find({ id: emailListSignUpFieldId }).props().label.props.children).equal('AuthModal.RegisterForm.underageEmailSignUp')
      expect(wrapper.find({ htmlFor: emailFieldId }).props().label.props.children).equal('AuthModal.RegisterForm.underageEmail')
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
