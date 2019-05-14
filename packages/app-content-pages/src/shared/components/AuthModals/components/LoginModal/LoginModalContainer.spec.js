import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import LoginModalContainer from './LoginModalContainer'
import LoginModal from './LoginModal'

let wrapper
let componentWrapper

const fakeSignIn = sinon.fake.resolves()

const AUTH_CLIENT = {
  signIn: fakeSignIn
}

describe('Component > LoginModalContainer', function () {
  before(function () {
    wrapper = shallow(<LoginModalContainer.wrappedComponent
      authClient={AUTH_CLIENT}
      closeLoginModal={Function.prototype}
    />)
    componentWrapper = wrapper.find(LoginModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `LoginModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('onSubmit method', function () {
    it('should exist', function () {
      expect(wrapper.instance().onSubmit).to.be.ok()
    })

    it('should be passed to the LoginModal component', function () {
      expect(componentWrapper.prop('onSubmit')).to.be.a('function')
    })

    it('should call the authClient signIn method', function () {
      wrapper.instance().onSubmit({})
      expect(fakeSignIn.called).to.be.true()
    })
  })
})
