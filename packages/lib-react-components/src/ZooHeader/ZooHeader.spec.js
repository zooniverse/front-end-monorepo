import { shallow } from 'enzyme'
import React from 'react'
import MainNavList from './components/MainNavList'
import NarrowMainNavMenu from './components/NarrowMainNavMenu'
import SignInButton from './components/SignInButton'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import ZooniverseLogo from './components/ZooniverseLogo'
import ZooHeader from './ZooHeader'

const user = { display_name: 'zootester1', login: 'zootester1' }

describe.only('ZooHeader', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<ZooHeader signIn={() => {}} signOut={() => {}} user={{}} />)
  })

  it('renders without crashing', function () { })

  it('renders ZooniverseLogo', function () {
    expect(wrapper.find(ZooniverseLogo)).to.have.lengthOf(1)
  })

  it('renders a MainNavList when the window innerWidth is greater than 960', function () {
    expect(wrapper.find(MainNavList)).to.have.lengthOf(1)
    expect(wrapper.find(NarrowMainNavMenu)).to.have.lengthOf(0)
  })

  xit('renders a NarrowMainNavMenu when the window innerWidth is less than 960', function () {
    expect(wrapper.find(MainNavList)).to.have.lengthOf(0)
    expect(wrapper.find(NarrowMainNavMenu)).to.have.lengthOf(1)
  })

  it('renders a sign in button when there is no user', function () {
    expect(wrapper.find(SignInButton)).to.have.lengthOf(1)
    expect(wrapper.find(SignedInUserNavigation)).to.have.lengthOf(0)
  })

  it('renders the signed in navigation when there is user', function () {
    wrapper.setProps({ user })
    expect(wrapper.find(SignInButton)).to.have.lengthOf(0)
    expect(wrapper.find(SignedInUserNavigation)).to.have.lengthOf(1)
  })
})
