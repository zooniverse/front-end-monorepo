import { shallow } from 'enzyme'
import React from 'react'

import AuthModals from './AuthModals'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

const CLOSE_LOGIN_MODAL = Function.prototype
const CLOSE_REGISTER_MODAL = Function.prototype

describe('Component > AuthModals', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<AuthModals
      closeLoginModal={CLOSE_LOGIN_MODAL}
      closeRegisterModal={CLOSE_REGISTER_MODAL}
    />)
  })

  afterEach(function () {
    wrapper.setProps({
      showLoginModal: false,
      showRegisterModal: false
    })
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the LoginModal if the `showLoginModal` prop is true', function () {
    expect(wrapper.find(LoginModal)).to.have.lengthOf(0)
    wrapper.setProps({ showLoginModal: true })
    expect(wrapper.find(LoginModal)).to.have.lengthOf(1)
  })

  it('should should pass through the `closeLoginModal` prop', function () {
    wrapper.setProps({ showLoginModal: true })
    const loginModal = wrapper.find(LoginModal)
    expect(loginModal.prop('closeLoginModal')).to.equal(CLOSE_LOGIN_MODAL)
  })

  it('should render the Register if the `showRegisterModal` prop is true', function () {
    expect(wrapper.find(RegisterModal)).to.have.lengthOf(0)
    wrapper.setProps({ showRegisterModal: true })
    expect(wrapper.find(RegisterModal)).to.have.lengthOf(1)
  })

  it('should should pass through the `closeRegisterModal` prop', function () {
    wrapper.setProps({ showRegisterModal: true })
    const registerModal = wrapper.find(RegisterModal)
    expect(registerModal.prop('closeRegisterModal')).to.equal(CLOSE_REGISTER_MODAL)
  })
})
