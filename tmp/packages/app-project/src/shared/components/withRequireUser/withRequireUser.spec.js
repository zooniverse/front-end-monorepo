import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import withRequireUser from './withRequireUser'

describe('withRequireUser', function () {
  function StubComponent () {
    return <p>Hello</p>
  }
  const WithRequireUser = withRequireUser(StubComponent)
  let wrapper

  before(function () {
    wrapper = shallow(<WithRequireUser.wrappedComponent />)
  })

  describe('behavior when not logged in', function () {
    before(function () {
      wrapper.setProps({ isLoggedIn: false })
    })

    it('should render the wrapped component', function () {
      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should include a message to login', function () {
      expect(wrapper.html()).to.include('You need to be signed in!')
    })
  })

  describe('behavior when logged in', function () {
    before(function () {
      wrapper.setProps({ isLoggedIn: true })
    })

    it('should render the wrapped component', function () {
      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('shouldn\'t render anything else', function () {
      expect(wrapper.children()).to.have.lengthOf(1)
    })
  })
})
