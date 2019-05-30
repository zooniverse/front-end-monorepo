import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { LoginFormContainer } from './LoginFormContainer'
import LoginForm from './LoginForm'

let wrapper
let componentWrapper

const CLOSE_MODAL = sinon.spy()

const MOCK_STORE = {
  user: { set: sinon.spy() }
}

const MOCK_USER_RESOURCE = { foo: 'bar' }

const INVALID_SIGN_IN_ERROR = {
  message: 'Everything is broken'
}
const INVALID_SIGN_IN = sinon.stub().rejects(INVALID_SIGN_IN_ERROR)
const VALID_SIGN_IN = sinon.stub().resolves(MOCK_USER_RESOURCE)

const MOCK_FORM_VALUES = {
  username: 'foo',
  password: 'bar'
}

const MOCK_FORMIK = {
  setFieldError: sinon.spy(),
  setSubmitting: sinon.spy()
}

describe('Component > LoginFormContainer', function () {
  before(function () {
    wrapper = shallow(<LoginFormContainer
      closeModal={CLOSE_MODAL}
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
        expect(MOCK_FORMIK.setFieldError).to.have.been.calledWith('password', INVALID_SIGN_IN_ERROR.message)
        expect(MOCK_FORMIK.setSubmitting).to.have.been.calledWith(false)
      }
    })
  })
})
