import { shallow } from 'enzyme'
import React from 'react'

import AuthModalContainer from './AuthModalContainer'
import AuthModal from './AuthModal'

let wrapper
let componentWrapper

const ROUTER = {
  asPath: '/',
  pathname: 'foobar',
  push: Function.prototype
}

describe('Component > AuthModalContainer', function () {
  before(function () {
    wrapper = shallow(<AuthModalContainer.wrappedComponent
      router={ROUTER}
    />)
    componentWrapper = wrapper.find(AuthModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AuthModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a prop to show the Login modal if there is a matching url query', function () {
    const loginRouter = { ...ROUTER }
    const loginWrapper = shallow(<AuthModalContainer.wrappedComponent
      router={ROUTER}
    />)
    expect(getProp(loginWrapper, 'activeIndex')).to.equal(-1)

    loginRouter.asPath = '/?login=true'
    loginWrapper.setProps({ router: loginRouter })
    expect(getProp(loginWrapper, 'activeIndex')).to.equal(0)
  })

  it('should pass a prop to show the Register modal if there is a matching url query', function () {
    const registerRouter = { ...ROUTER }
    const registerWrapper = shallow(<AuthModalContainer.wrappedComponent
      router={ROUTER}
    />)
    expect(getProp(registerWrapper, 'activeIndex')).to.equal(0)

    registerRouter.asPath = '/?register=true'
    registerWrapper.setProps({ router: registerRouter })
    expect(getProp(registerWrapper, 'activeIndex')).to.equal(1)
  })

  it('should pass a function prop to close the login modal', function () {
    expect(getProp(wrapper, 'closeRegisterModal')).to.be.a('function')
  })

  it('should pass a function prop to close the register modal', function () {
    expect(getProp(wrapper, 'closeRegisterModal')).to.be.a('function')
  })
})

function getProp (wrapper, propName) {
  return wrapper.find(AuthModal).prop(propName)
}
