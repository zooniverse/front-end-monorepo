import { shallow } from 'enzyme'
import React from 'react'

import AuthModalsContainer from './AuthModalsContainer'
import AuthModals from './AuthModals'

let wrapper
let componentWrapper

const ROUTER = {
  asPath: '/',
  pathname: 'foobar',
  push: Function.prototype
}

describe('Component > AuthModalsContainer', function () {
  before(function () {
    wrapper = shallow(<AuthModalsContainer.wrappedComponent
      router={ROUTER}
    />)
    componentWrapper = wrapper.find(AuthModals)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AuthModals` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a prop to show the Login modal if there is a matching url query', function () {
    const loginRouter = Object.assign({}, ROUTER)
    const loginWrapper = shallow(<AuthModalsContainer.wrappedComponent
      router={ROUTER}
    />)
    expect(getProp(loginWrapper, 'showLoginModal')).to.be.false()

    loginRouter.asPath = '/?login=true'
    loginWrapper.setProps({ router: loginRouter })
    expect(getProp(loginWrapper, 'showLoginModal')).to.be.true()
  })

  it('should pass a prop to show the Register modal if there is a matching url query', function () {
    const registerRouter = Object.assign({}, ROUTER)
    const registerWrapper = shallow(<AuthModalsContainer.wrappedComponent
      router={ROUTER}
    />)
    expect(getProp(registerWrapper, 'showRegisterModal')).to.be.false()

    registerRouter.asPath = '/?register=true'
    registerWrapper.setProps({ router: registerRouter })
    expect(getProp(registerWrapper, 'showRegisterModal')).to.be.true()
  })

  it('should pass a function prop to close the login modal', function () {
    expect(getProp(wrapper, 'closeRegisterModal')).to.be.a('function')
  })

  it('should pass a function prop to close the register modal', function () {
    expect(getProp(wrapper, 'closeRegisterModal')).to.be.a('function')
  })
})

function getProp (wrapper, propName) {
  return wrapper.find(AuthModals).prop(propName)
}
