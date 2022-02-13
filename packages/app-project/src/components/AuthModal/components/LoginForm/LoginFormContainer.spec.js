import { shallow } from 'enzyme'
import sinon from 'sinon'

import { LoginFormContainer } from './LoginFormContainer'
import LoginForm from './LoginForm'

let wrapper
let componentWrapper

const MOCK_USER_RESOURCE = { foo: 'bar' }

const INVALID_SIGN_IN_ERROR = {
  message: 'Invalid email or password.'
}

const API_ERROR = { code: 504, message: 'Gateway Timeout' }

const MOCK_FORM_VALUES = {
  username: 'foo',
  password: 'bar'
}

describe('Component > LoginFormContainer', function () {
  before(function () {
    wrapper = shallow(<LoginFormContainer
      closeModal={() => {}}
    />)
    componentWrapper = wrapper.find(LoginForm)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `LoginForm` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('onSubmit', function () {
    let CLOSE_MODAL, MOCK_STORE, VALID_SIGN_IN, INVALID_SIGN_IN, API_ERROR_STUB, MOCK_FORMIK
    before(function () {
      CLOSE_MODAL = sinon.spy()
      MOCK_STORE = {
        user: { set: sinon.spy() }
      }
      VALID_SIGN_IN = sinon.stub().resolves(MOCK_USER_RESOURCE)

      INVALID_SIGN_IN = sinon.stub().rejects(INVALID_SIGN_IN_ERROR)

      API_ERROR_STUB = sinon.stub().rejects(API_ERROR)
      MOCK_FORMIK = {
        setFieldError: sinon.spy(),
        setSubmitting: sinon.spy()
      }
    })

    afterEach(function () {
      CLOSE_MODAL.resetHistory()
      MOCK_STORE.user.set.resetHistory()
      VALID_SIGN_IN.resetHistory()
      INVALID_SIGN_IN.resetHistory()
      API_ERROR_STUB.resetHistory()
      MOCK_FORMIK.setFieldError.resetHistory()
      MOCK_FORMIK.setSubmitting.resetHistory()
    })

    it('should be passed to the LoginForm', function () {
      expect(componentWrapper.prop('onSubmit')).to.be.a('function')
    })

    it('should complete the sign in process when passed a valid set of credentials', async function () {
      const validWrapper = shallow(<LoginFormContainer
        authClient={{ signIn: VALID_SIGN_IN }}
        closeModal={CLOSE_MODAL}
        store={MOCK_STORE}
      />)

      try {
        await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
        expect(VALID_SIGN_IN).to.have.been.calledWith(MOCK_FORM_VALUES)
        expect(MOCK_FORMIK.setSubmitting).to.have.been.calledWith(false)
        expect(MOCK_STORE.user.set).to.have.been.calledWith(MOCK_USER_RESOURCE)
        expect(CLOSE_MODAL).to.have.been.called()
      } catch (error) {
        expect.fail(error)
      }
    })

    it('should return feedback when passed an invalid set of credentials', async function () {
      const validWrapper = shallow(<LoginFormContainer
        authClient={{ signIn: INVALID_SIGN_IN }}
        closeModal={CLOSE_MODAL}
        store={MOCK_STORE}
      />)

      try {
        await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
        expect.fail()
      } catch (error) {
        expect(INVALID_SIGN_IN).to.have.been.calledWith(MOCK_FORM_VALUES)
        // The translation function t is set to simply return keys in a testing environment
        expect(MOCK_FORMIK.setFieldError).to.have.been.calledWith('login', 'AuthModal.LoginForm.error')
        expect(MOCK_FORMIK.setFieldError).to.have.been.calledWith('password', 'AuthModal.LoginForm.error')
        expect(MOCK_FORMIK.setSubmitting).to.have.been.calledWith(false)
        expect(CLOSE_MODAL).to.not.have.been.called()
      }
    })

    it('should pass a general error message on other API errors', async function () {
      const validWrapper = shallow(<LoginFormContainer
        authClient={{ signIn: API_ERROR_STUB }}
        closeModal={CLOSE_MODAL}
        store={MOCK_STORE}
      />)

      try {
        await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
        expect(API_ERROR_STUB).to.have.been.calledOnceWith(MOCK_FORM_VALUES)
        expect(validWrapper.state().error).to.equal(API_ERROR.message)
        expect(validWrapper.find(LoginForm).props().generalError).to.equal(API_ERROR.message)
        expect(MOCK_FORMIK.setSubmitting).to.have.been.calledOnceWith(false)
        expect(CLOSE_MODAL).to.not.have.been.called()
      } catch (error) {
        expect.fail(error)
      }
    })
  })
})
