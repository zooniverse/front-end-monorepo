import { shallow } from 'enzyme'
import sinon from 'sinon'

import { RegisterFormContainer } from './RegisterFormContainer'
import RegisterForm from './RegisterForm'

let wrapper
let componentWrapper

const INVALID_REGISTRATION_ERROR = {
  message: 'email has already been taken login has already been taken'
}

const INVALID_USERNAME_MESSAGE = 'That username is taken'

const INVALID_EMAIL_MESSAGE = 'An account with this address already exists'

const API_ERROR = { code: 504, message: 'Gateway Timeout' }

const MOCK_USER_RESOURCE = { id: '1' }

const MOCK_FORM_VALUES = {
  betaListSignUp: false,
  email: 'jane@gmail.com',
  emailConfirm: 'jane@gmail.com',
  emailListSignUp: true,
  password: 'password',
  passwordConfirm: 'password',
  privacyAgreement: true,
  realName: 'Jane Doe',
  username: 'janeloveszooniverse'
}

const MOCK_INVALID_FORM_VALUES = {
  betaListSignUp: false,
  email: 'jane@gmail.com',
  emailConfirm: 'jane@gmail.co',
  emailListSignUp: true,
  password: 'password',
  passwordConfirm: 'passwod',
  privacyAgreement: false,
  realName: 'Jane Doe',
  username: 'janeloveszooniverse'
}

const MOCK_SUBMISSION_VALUES = {
  beta_email_communication: false,
  credited_name: 'Jane Doe',
  email: 'jane@gmail.com',
  global_email_communication: true,
  login: 'janeloveszooniverse',
  password: 'password',
  project_email_communication: true
}

describe('Component > RegisterFormContainer', function () {
  before(function () {
    wrapper = shallow(<RegisterFormContainer />)
    componentWrapper = wrapper.find(RegisterForm)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `RegisterForm` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('synchronous form validation', function () {
    before(function () {
      wrapper = shallow(<RegisterFormContainer />)
    })

    it('should not return errors when there are valid values', function () {
      const errors = wrapper.instance().validate(MOCK_FORM_VALUES)
      expect(Object.keys(errors)).to.have.lengthOf(0)
    })

    it('should return an error when there are invalid values', function () {
      const errors = wrapper.instance().validate(MOCK_INVALID_FORM_VALUES)
      /** The translation function t is set to simply return keys in a testing environment **/
      expect(errors.passwordConfirm).to.equal('AuthModal.RegisterForm.passwordConfirmError')
      expect(errors.emailConfirm).to.equal('AuthModal.RegisterForm.emailConfirmError')
      expect(errors.privacyAgreement).to.equal('AuthModal.RegisterForm.privacyAgreementError')
    })
  })

  describe('onSubmit', function () {
    let CLOSE_MODAL, MOCK_STORE, VALID_REGISTRATION, INVALID_REGISTRATION, API_ERROR_STUB, MOCK_FORMIK
    before(function () {
      CLOSE_MODAL = sinon.spy()
      MOCK_STORE = {
        user: { set: sinon.spy() }
      }
      VALID_REGISTRATION = sinon.stub().resolves(MOCK_USER_RESOURCE)

      INVALID_REGISTRATION = sinon.stub().rejects(INVALID_REGISTRATION_ERROR)

      API_ERROR_STUB = sinon.stub().rejects(API_ERROR)
      MOCK_FORMIK = {
        setFieldError: sinon.spy(),
        setSubmitting: sinon.spy()
      }
    })

    afterEach(function () {
      CLOSE_MODAL.resetHistory()
      MOCK_STORE.user.set.resetHistory()
      VALID_REGISTRATION.resetHistory()
      INVALID_REGISTRATION.resetHistory()
      API_ERROR_STUB.resetHistory()
      MOCK_FORMIK.setFieldError.resetHistory()
      MOCK_FORMIK.setSubmitting.resetHistory()
    })

    it('should be passed to the RegisterForm', function () {
      expect(componentWrapper.prop('onSubmit')).to.be.a('function')
    })

    describe('when the values are valid', function () {
      it('should complete the registration process', async function () {
        const validWrapper = shallow(<RegisterFormContainer
          authClient={{ register: VALID_REGISTRATION }}
          closeModal={CLOSE_MODAL}
          store={MOCK_STORE}
        />)

        try {
          const errors = validWrapper.instance().validate(MOCK_FORM_VALUES)
          await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
          expect(Object.keys(errors)).to.have.lengthOf(0)
          expect(VALID_REGISTRATION).to.have.been.calledOnceWith(MOCK_SUBMISSION_VALUES)
          expect(MOCK_FORMIK.setSubmitting).to.have.been.calledOnceWith(false)
          expect(MOCK_STORE.user.set).to.have.been.calledOnceWith(MOCK_USER_RESOURCE)
          expect(CLOSE_MODAL).to.have.been.calledOnce()
        } catch (error) {
          expect.fail(error)
        }
      })
    })

    describe('when there is an API error', function () {
      it('should return feedback when there is username or email conflict', async function () {
        const validWrapper = shallow(<RegisterFormContainer
          authClient={{ register: INVALID_REGISTRATION }}
          closeModal={CLOSE_MODAL}
          store={MOCK_STORE}
        />)

        try {
          const synchronousErrors = validWrapper.instance().validate(MOCK_FORM_VALUES)
          await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
          expect(Object.keys(synchronousErrors)).to.have.lengthOf(0)
          expect(INVALID_REGISTRATION).to.have.been.calledOnceWith(MOCK_SUBMISSION_VALUES)
          /** The translation function t is set to simply return keys in a testing environment **/
          expect(MOCK_FORMIK.setFieldError.withArgs('username', 'AuthModal.RegisterForm.usernameConflict')).to.have.been.calledOnce()
          expect(MOCK_FORMIK.setFieldError.withArgs('email', 'AuthModal.RegisterForm.emailConflict')).to.have.been.calledOnce()
          expect(MOCK_FORMIK.setSubmitting).to.have.been.calledOnceWith(false)
          expect(CLOSE_MODAL).to.not.have.been.called()
        } catch (error) {
          expect.fail(error)
        }
      })

      it('should pass a general error message on other API errors', async function () {
        const validWrapper = shallow(<RegisterFormContainer
          authClient={{ register: API_ERROR_STUB }}
          closeModal={CLOSE_MODAL}
          store={MOCK_STORE}
        />)

        try {
          const synchronousErrors = validWrapper.instance().validate(MOCK_FORM_VALUES)
          await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
          expect(Object.keys(synchronousErrors)).to.have.lengthOf(0)
          expect(API_ERROR_STUB).to.have.been.calledOnceWith(MOCK_SUBMISSION_VALUES)
          expect(validWrapper.state().error).to.equal(API_ERROR.message)
          expect(validWrapper.find(RegisterForm).props().generalError).to.equal(API_ERROR.message)
          expect(MOCK_FORMIK.setSubmitting).to.have.been.calledOnceWith(false)
          expect(CLOSE_MODAL).to.not.have.been.called()
        } catch (error) {
          expect.fail(error)
        }
      })
    })
  })
})
