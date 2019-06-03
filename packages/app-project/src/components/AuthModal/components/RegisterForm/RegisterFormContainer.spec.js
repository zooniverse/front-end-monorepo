import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { RegisterFormContainer } from './RegisterFormContainer'
import RegisterForm from './RegisterForm'

let wrapper
let componentWrapper

const CLOSE_MODAL = sinon.spy()

const MOCK_STORE = {
  user: { set: sinon.spy() }
}

const MOCK_USER_RESOURCE = { id: '1' }

const VALID_REGISTRATION = sinon.stub().resolves(MOCK_USER_RESOURCE)

const MOCK_FORM_VALUES = {
  betaListSignUp: false,
  email: 'jane@gmail.com', 
  emailListSignUp: true, 
  password: 'password', 
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

const MOCK_FORMIK = {
  setSubmitting: sinon.spy()
}

describe('Component > RegisterFormContainer', function () {
  before(function () {
    wrapper = shallow(<RegisterFormContainer
      closeModal={CLOSE_MODAL}
    />)
    componentWrapper = wrapper.find(RegisterForm)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `RegisterForm` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('onSubmit', function () {
    it('should be passed to the RegisterForm', function () {
      expect(componentWrapper.prop('onSubmit')).to.be.a('function')
    })

    it('should complete the registration process when passed a valid set of values', async function () {
      const validWrapper = shallow(<RegisterFormContainer
        authClient={{ register: VALID_REGISTRATION }}
        closeModal={CLOSE_MODAL}
        store={MOCK_STORE}
      />)

      try {
        await validWrapper.instance().onSubmit(MOCK_FORM_VALUES, MOCK_FORMIK)
        expect(VALID_REGISTRATION).to.have.been.calledWith(MOCK_SUBMISSION_VALUES)
        expect(MOCK_FORMIK.setSubmitting).to.have.been.calledWith(false)
        expect(MOCK_STORE.user.set).to.have.been.calledWith(MOCK_USER_RESOURCE)
        expect(CLOSE_MODAL).to.have.been.called()
      } catch (error) {
        expect.fail(error)
      }
    })
  })
})
