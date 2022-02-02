import { shallow } from 'enzyme'
import React from 'react'
import NarrowMenu from '../NarrowMenu'
import NarrowMainNavMenu from './NarrowMainNavMenu'

const mockMainHeaderNavLabels = [
  'Projects',
  'About',
  'Get Involved',
  'Talk',
  'Build'
]

const mockMainHeaderNavUrls = [
  '/projects',
  '/about',
  '/get-involved',
  '/talk',
  '/lab'
]

describe('NarrowMainNavMenu', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <NarrowMainNavMenu
        adminNavLinkLabel='Admin'
        adminNavLinkURL='/admin'
        mainHeaderNavListLabels={mockMainHeaderNavLabels}
        mainHeaderNavListURLs={mockMainHeaderNavUrls}
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
    expect(menuItems[menuItems.length - 1].href).to.equal('/admin')
  })
})
