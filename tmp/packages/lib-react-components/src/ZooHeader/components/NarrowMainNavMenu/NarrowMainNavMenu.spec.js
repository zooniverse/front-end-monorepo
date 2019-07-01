import { shallow } from 'enzyme'
import React from 'react'
import NarrowMenu from '../NarrowMenu'
import NarrowMainNavMenu from './NarrowMainNavMenu'
import {
  adminNavLinkLabel,
  adminNavLinkURL,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
} from '../../helpers'

describe('NarrowMainNavMenu', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <NarrowMainNavMenu
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
      />
    )
  })

  it('renders without crashing', function () { })

  it('renders a NarrowMenu', function () {
    expect(wrapper.find(NarrowMenu)).to.have.lengthOf(1)
  })

  it('adds an admin link to the menu items if props.isAdmin is true', function () {
    wrapper.setProps({ isAdmin: true })
    const menuItems = wrapper.props().items
    expect(menuItems[menuItems.length - 1].href).to.equal(adminNavLinkURL)
  })
})
