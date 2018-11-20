import { shallow } from 'enzyme'
import React from 'react'
import NavListItem from '../NavListItem'
import MainNavList from './MainNavList'
import {
  adminNavLinkLabel,
  adminNavLinkURL,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
} from '../../helpers'

describe('MainNavList', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <MainNavList
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
      />
    )
  })

  it('renders without crashing', function () { })

  it('renders NavListItem components', function () {
    expect(wrapper.find(NavListItem)).to.have.lengthOf(mainHeaderNavListLabels.length)
  })

  it('adds an admin link to the menu items if props.isAdmin is true', function () {
    wrapper.setProps({ isAdmin: true })
    const adminMenuItem = wrapper.find(NavListItem).last()
    expect(adminMenuItem.props().url).to.equal(adminNavLinkURL)
  })
})
