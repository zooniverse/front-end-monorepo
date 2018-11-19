import { shallow } from 'enzyme'
import React from 'react'
import MainNavList from './components/MainNavList'
import SignedOutUserNavigation from './components/SignedOutUserNavigation'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import ZooniverseLogo from './components/ZooniverseLogo'
import ZooHeader from './ZooHeader'

const user = { display_name: 'zootester1', login: 'zootester1' }

describe('ZooHeader', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<ZooHeader signIn={() => {}} signOut={() => {}} user={{}} />)
  })

  it('renders without crashing', function () { })

  it('renders ZooniverseLogo', function () {
    expect(wrapper.find(ZooniverseLogo)).to.have.lengthOf(1)
  })

  it('renders a MainNavList', function () {
    expect(wrapper.find(MainNavList)).to.have.lengthOf(1)
  })

  it('renders SignedOutUserNavigation', function () {
    expect(wrapper.find(SignedOutUserNavigation)).to.have.lengthOf(1)
  })

  it('renders SignedInUserNavigation', function () {
    wrapper.setProps({ user })
    expect(wrapper.find(SignedInUserNavigation)).to.have.lengthOf(1)
  })
})
