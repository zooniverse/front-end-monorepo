import { shallow } from 'enzyme'
import React from 'react'
import SignedOutUserNavigation from './SignedOutUserNavigation'
import NavButton from './components/NavButton'
import NarrowMainNavMenu from '../NarrowMainNavMenu'
import {
  adminNavLinkLabel,
  adminNavLinkURL,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
} from '../../helpers'

describe('SignedOutUserNavigation', function () {
  let wrapper
  const user = { display_name: 'zootester1', login: 'zootester1' }
  before(function () {
    wrapper = shallow(
      <SignedOutUserNavigation
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
        register={() => {}}
        signIn={() => {}}
        user={{}}
      />
    )
  })

  it('renders without crashing', function () { })

  it('renders a button to sign in', function () {
    const signInButton = wrapper.find(NavButton).first()
    expect(signInButton.props().label).to.equal('Sign In')
  })

  it('renders a button to register', function () {
    const registerButton = wrapper.find(NavButton).last()
    expect(registerButton.props().label).to.equal('Register')
  })

  it('renders NarrowMainNavMenu if props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true })
    expect(wrapper.find(NarrowMainNavMenu)).to.have.lengthOf(1)
    wrapper.setProps({ isNarrow: false })
  })

  it('should render null if there\'s a user', function () {
    wrapper.setProps({ user })
    expect(wrapper.html()).to.be.null
  })
})
