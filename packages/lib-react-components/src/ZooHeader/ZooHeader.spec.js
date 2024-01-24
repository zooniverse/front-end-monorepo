import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, * as Stories from './ZooHeader.stories.js'

describe('ZooHeader', function () {
  let mainNavList, zooLogo

  describe('default behaviour', function () {
    before(function () {
      const ZooHeaderStory = composeStory(Stories.SignedOut, Meta)
      render(<ZooHeaderStory />)
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
      const ZooHeaderStory = composeStory(Stories.SignedOut, Meta)
      render(<ZooHeaderStory />)
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
    let userNavigation, userLinks, userMenu

    before(function () {
      const ZooHeaderStory = composeStory(Stories.SignedIn, Meta)
      render(<ZooHeaderStory />)
      userNavigation = screen.getByRole('navigation', { name: 'User account' })
      userLinks = within(userNavigation).getAllByRole('link')
      userMenu = within(userNavigation).getByRole('button', {
        name: 'zootester1'
      })
    })

    it('should have a user account menu', function () {
      expect(userNavigation).to.exist()
    })

    it('should link to notifications', function () {
      expect(userLinks[0].href).to.equal('https://www.zooniverse.org/notifications')
    })

    it('should link to messages', function () {
      expect(userLinks[1].href).to.equal('https://www.zooniverse.org/inbox')
    })

    it('should have a user menu button', function () {
      expect(userMenu).to.exist()
    })
  })

  describe('admin user in Admin Mode', function () {
    let adminLink, userNavigation, userLinks, userMenu

    before(function () {
      const ZooHeaderStory = composeStory(Stories.SignedInAdminMode, Meta)
      render(<ZooHeaderStory />)
      const mainNavList = screen.getByRole('navigation', { name: 'Site' })
      adminLink = within(mainNavList).getByRole('link', { name: 'Admin' })
      userNavigation = screen.getByRole('navigation', { name: 'User account' })
      userLinks = within(userNavigation).getAllByRole('link')
      userMenu = within(userNavigation).getByRole('button', {
        name: 'zootester1'
      })
    })

    it('should have a user account menu', function () {
      expect(userNavigation).to.exist()
    })

    it('should link to notifications', function () {
      expect(userLinks[0].href).to.equal('https://www.zooniverse.org/notifications')
    })

    it('should link to messages', function () {
      expect(userLinks[1].href).to.equal('https://www.zooniverse.org/inbox')
    })

    it('should have a user menu button', function () {
      expect(userMenu).to.exist()
    })

    it('should have an admin link', function () {
      expect(adminLink.href).to.equal('https://www.zooniverse.org/admin')
    })
  })

  describe('showing a theme toggle', function () {
    before(function () {
      const ZooHeaderStory = composeStory(Stories.ThemeToggleSignedIn, Meta)
      render(<ZooHeaderStory />)    })

    it('shows theme toggle', function () {
      const toggle = screen.getByLabelText('Switch to dark theme')
      expect(toggle).to.exist()
    })
  })
})
