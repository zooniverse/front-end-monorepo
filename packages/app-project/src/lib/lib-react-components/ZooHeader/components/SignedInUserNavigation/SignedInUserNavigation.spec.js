import { shallow } from 'enzyme'
import React from 'react'
import SignedInUserNavigation from './SignedInUserNavigation'
import NavListItem from '../NavListItem'
import NarrowMainNavMenu from '../NarrowMainNavMenu'
import UserMenu from '../UserMenu'
import {
  adminNavLinkLabel,
  adminNavLinkURL,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
} from '../../helpers'

describe('SignedInUserNavigation', function () {
  let wrapper
  const user = { display_name: 'zootester1', login: 'zootester1' }
  before(function () {
    wrapper = shallow(
      <SignedInUserNavigation
        adminNavLinkLabel={adminNavLinkLabel}
        adminNavLinkURL={adminNavLinkURL}
        mainHeaderNavListLabels={mainHeaderNavListLabels}
        mainHeaderNavListURLs={mainHeaderNavListURLs}
        signOut={() => {}}
        user={user}
      />
    )
  })

  it('renders without crashing', function () { })

  it('renders a notifications link', function () {
    const notificationsLink = wrapper.find(NavListItem).first()
    expect(notificationsLink.props().label).to.equal('Notifications')
  })

  it('renders the notification link label with the count if props.unreadNotifications is greater than zero', function () {
    wrapper.setProps({ unreadNotifications: 3 })
    const notificationsLink = wrapper.find(NavListItem).first()
    expect(notificationsLink.props().label).to.equal('Notifications (3)')
    wrapper.setProps({ unreadNotifications: 0 })
  })

  it('renders a notifications icon if props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true })
    const notificationsLink = wrapper.find(NavListItem).first()
    expect(notificationsLink.props().label.props.icon.iconName).to.equal('bell')
    expect(notificationsLink.props().label.props.icon.prefix).to.equal('far')
    wrapper.setProps({ isNarrow: false })
  })

  it('renders the filled notifications icon if props.unreadNotifications is greater than zero and props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true, unreadNotifications: 3 })
    const notificationsLink = wrapper.find(NavListItem).first()
    expect(notificationsLink.props().label.props.icon.prefix).to.equal('fas')
    wrapper.setProps({ isNarrow: false, unreadNotifications: 0 })
  })

  it('renders a messages link', function () {
    const messagesLink = wrapper.find(NavListItem).last()
    expect(messagesLink.props().label).to.equal('Messages')
  })

  it('renders the messages link label with the count if props.unreadMessages is greater than zero', function () {
    wrapper.setProps({ unreadMessages: 3 })
    const messagesLink = wrapper.find(NavListItem).last()
    expect(messagesLink.props().label).to.equal('Messages (3)')
    wrapper.setProps({ unreadMessages: 0 })
  })

  it('renders a messages icon if props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true })
    const messagesLink = wrapper.find(NavListItem).last()
    expect(messagesLink.props().label.props.icon.iconName).to.equal('envelope')
    expect(messagesLink.props().label.props.icon.prefix).to.equal('far')
    wrapper.setProps({ isNarrow: false })
  })

  it('renders the filled messages icon if props.unreadMessages is greater than zero and props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true, unreadMessages: 3 })
    const messagesLink = wrapper.find(NavListItem).last()
    expect(messagesLink.props().label.props.icon.prefix).to.equal('fas')
    wrapper.setProps({ isNarrow: false, unreadMessages: 0 })
  })

  it('renders a UserMenu', function () {
    expect(wrapper.find(UserMenu)).to.have.lengthOf(1)
  })

  it('renders NarrowMainNavMenu if props.isNarrow is true', function () {
    wrapper.setProps({ isNarrow: true })
    expect(wrapper.find(NarrowMainNavMenu)).to.have.lengthOf(1)
    wrapper.setProps({ isNarrow: false })
  })

  it('should render null if there isn\'t a user', function () {
    wrapper.setProps({ user: {} })
    expect(wrapper.html()).to.be.null
  })
})
