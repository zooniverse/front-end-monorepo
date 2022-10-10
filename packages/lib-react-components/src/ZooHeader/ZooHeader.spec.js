import React from 'react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import MainNavList from './components/MainNavList'
import SignedOutUserNavigation from './components/SignedOutUserNavigation'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import ZooniverseLogo from '../ZooniverseLogo'
import ZooHeader from './ZooHeader'

describe('ZooHeader', function () {
  let mainNavList, zooLogo

  before(function () {
    render(<ZooHeader signIn={() => {}} signOut={() => {}} />)
    zooLogo = screen.getByRole('img', { name: 'Zooniverse Logo' })
    mainNavList = screen.getByRole('navigation', { name: 'Site' })
  })

  it('renders ZooniverseLogo', function () {
    expect(zooLogo).to.exist()
  })

  it('renders a MainNavList', function () {
    expect(mainNavList).to.exist()
  })

  describe('logged out', function () {
    let signIn, register

    before(function () {
      render(<ZooHeader signIn={() => {}} signOut={() => {}} />)
      signIn = screen.getByRole('button', { name: 'Sign In' })
      register = screen.getByRole('button', { name: 'Register' })
    })

    it('should have a Sign In button', function () {
      expect(signIn).to.exist()
    })

    it('should have a Register button', function () {
      expect(register).to.exist()
    })
  })

  describe('logged in', function () {
    let userNavigation, notifications, messages, userMenu

    before(function () {
      const user = { display_name: 'zootester1', login: 'zootester1' }
      render(<ZooHeader signIn={() => {}} signOut={() => {}} user={user} />)
      userNavigation = screen.getByRole('navigation', { name: 'User account'})
      notifications = within(userNavigation).getByRole('link', { name: 'Notifications'})
      messages = within(userNavigation).getByRole('link', { name: 'Messages'})
      userMenu = within(userNavigation).getByRole('button', { name: 'Open Menu' })
    })

    it('should have a user account menu', function () {
      expect(userNavigation).to.exist()
    })

    it('should link to notifications', function () {
      expect(notifications.href).to.equal('https://www.zooniverse.org/notifications')
    })

    it('should link to messages', function () {
      expect(messages.href).to.equal('https://www.zooniverse.org/inbox')
    })

    it('should have a user menu button', function () {
      expect(userMenu).to.exist()
    })
  })
})
