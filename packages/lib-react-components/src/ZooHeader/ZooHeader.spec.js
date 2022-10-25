import React from 'react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainNavList from './components/MainNavList'
import SignedOutUserNavigation from './components/SignedOutUserNavigation'
import SignedInUserNavigation from './components/SignedInUserNavigation'
import ZooniverseLogo from '../ZooniverseLogo'
import ZooHeader from './ZooHeader'

describe('ZooHeader', function () {
  this.timeout(5000)
  let mainNavList, zooLogo

  describe('default behaviour', function () {
    before(function () {
      render(<ZooHeader signIn={() => {}} signOut={() => {}} />)
      zooLogo = screen.getByRole('img', { name: 'Zooniverse Logo' })
      mainNavList = screen.getByRole('navigation', { name: 'Site' })
    })

    it('shows the Zooniverse logo', function () {
      expect(zooLogo).to.exist()
    })

    it('shows the Zooniverse site navigation', function () {
      expect(mainNavList).to.exist()
    })
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
      render(<ZooHeader user={user} unreadMessages={2} unreadNotifications={1} />)
      userNavigation = screen.getByRole('navigation', { name: 'User account'})
      notifications = within(userNavigation).getByRole('link', { name: 'Notifications (1)'})
      messages = within(userNavigation).getByRole('link', { name: 'Messages (2)'})
      userMenu = within(userNavigation).getByRole('button', { name: 'zootester1' })
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

  describe('admin user in Admin Mode', function () {
    let adminLink, userNavigation, notifications, messages, userMenu

    before(function () {
      const user = { display_name: 'Zoo Admin', login: 'zoo-admin', admin: true }
      render(<ZooHeader isAdmin signIn={() => {}} signOut={() => {}} user={user} />)
      const mainNavList = screen.getByRole('navigation', { name: 'Site' })
      adminLink = within(mainNavList).getByRole('link', { name: 'Admin' })
      userNavigation = screen.getByRole('navigation', { name: 'User account'})
      notifications = within(userNavigation).getByRole('link', { name: 'Notifications'})
      messages = within(userNavigation).getByRole('link', { name: 'Messages'})
      userMenu = within(userNavigation).getByRole('button', { name: 'Zoo Admin' })
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

    it('should have an admin link', function () {
      expect(adminLink.href).to.equal('https://www.zooniverse.org/admin')
    })
  })

  describe('narrow screens', function () {
    describe('default behaviour', function () {
      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        render(<ZooHeader isNarrow signIn={() => {}} signOut={() => {}} />)
        zooLogo = screen.getByRole('img', { name: 'Zooniverse Logo' })
        const mainNavButton = screen.getByRole('button', { name: 'Main Navigation' })
        await user.click(mainNavButton)
        mainNavList = screen.getByRole('menu', { name: 'Main Navigation' })
      })

      it('shows the Zooniverse logo', function () {
        expect(zooLogo).to.exist()
      })

      it('shows the Zooniverse site navigation', function () {
        expect(mainNavList).to.exist()
      })
    })

    describe('logged out', function () {
      let signIn, register

      before(function () {
        render(<ZooHeader isNarrow signIn={() => {}} signOut={() => {}} />)
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
        const user = { display_name: 'Zoo Tester', login: 'zootester1' }
        render(<ZooHeader isNarrow signIn={() => {}} signOut={() => {}} user={user} />)
        userNavigation = screen.getByRole('navigation', { name: 'User account'})
        notifications = within(userNavigation).getByRole('link', { name: 'Notifications'})
        messages = within(userNavigation).getByRole('link', { name: 'Messages'})
        userMenu = within(userNavigation).getByRole('button', { name: 'Zoo Tester' })
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

    describe('admin user in Admin Mode', function () {
      let adminLink, userNavigation, notifications, messages, userMenu

      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        const userProp = { display_name: 'Zoo Admin', login: 'zoo-admin', admin: true }
        render(<ZooHeader isAdmin isNarrow signIn={() => {}} signOut={() => {}} user={userProp} />)
        const mainNavButton = screen.getByRole('button', { name: 'Main Navigation' })
        await user.click(mainNavButton)
        const mainNavList = screen.getByRole('menu', { name: 'Main Navigation' })
        adminLink = within(mainNavList).getByRole('menuitem', { name: 'Admin' })
        userNavigation = screen.getByRole('navigation', { name: 'User account'})
        notifications = within(userNavigation).getByRole('link', { name: 'Notifications'})
        messages = within(userNavigation).getByRole('link', { name: 'Messages'})
        userMenu = within(userNavigation).getAllByRole('button', { name: 'Zoo Admin' })
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

      it('should have an admin link', function () {
        expect(adminLink.href).to.equal('https://www.zooniverse.org/admin')
      })
    })
  })
})
