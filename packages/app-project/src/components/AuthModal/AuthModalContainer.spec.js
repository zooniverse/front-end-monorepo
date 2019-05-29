import { shallow } from 'enzyme'
import React from 'react'

import { AuthModalContainer } from './AuthModalContainer'
import AuthModal from './AuthModal'

let wrapper
let componentWrapper

const ROUTER = {
  asPath: '/',
  pathname: 'foobar',
  push: Function.prototype
}

describe.only('Component > AuthModalContainer', function () {
  before(function () {
    wrapper = shallow(<AuthModalContainer
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

  it('should pass a prop to show the Login tab if there is a matching url query', function () {
    const loginWrapper = shallow(<AuthModalContainer router={ROUTER} />)
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(-1)
    loginWrapper.setProps({ router: { ...ROUTER, asPath: '/?login=true' } })
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(0)
  })

  it('should pass a prop to show the Register tab if there is a matching url query', function () {
    const loginWrapper = shallow(<AuthModalContainer router={ROUTER} />)
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(-1)
    loginWrapper.setProps({ router: { ...ROUTER, asPath: '/?register=true' } })
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(1)
  })
})

function getChildProp (wrapper, propName) {
  return wrapper.find(AuthModal).prop(propName)
}
