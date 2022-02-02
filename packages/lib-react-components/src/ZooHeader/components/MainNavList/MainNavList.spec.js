import { shallow } from 'enzyme'
import React from 'react'
import NavListItem from '../NavListItem'
import MainNavList from './MainNavList'

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

describe('MainNavList', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <MainNavList
        adminNavLinkLabel='Admin'
        adminNavLinkURL='/admin'
        mainHeaderNavListLabels={mockMainHeaderNavLabels}
        mainHeaderNavListURLs={mockMainHeaderNavUrls}
      />
    )
  })

  it('renders without crashing', function () { })

  it('renders NavListItem components', function () {
    expect(wrapper.find(NavListItem)).to.have.lengthOf(mockMainHeaderNavLabels.length)
  })

  it('adds an admin link to the menu items if props.isAdmin is true', function () {
    wrapper.setProps({ isAdmin: true })
    const adminMenuItem = wrapper.find(NavListItem).last()
    expect(adminMenuItem.props().url).to.equal('/admin')
  })
})
