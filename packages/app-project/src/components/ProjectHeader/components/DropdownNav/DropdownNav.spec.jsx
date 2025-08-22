import { composeStories } from '@storybook/react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import * as Stories from './DropdownNav.stories'
const { Default, LoggedIn, AdminMode, WithOrganizationLink } = composeStories(Stories)

describe('Component > ProjectHeader > Dropdown Nav', function () {
  before(function () {
    nock('https://talk-staging.zooniverse.org')
    .persist()
    .get('/notifications')
    .query(true)
    .reply(200, {})
    .get('/conversations')
    .query(true)
    .reply(200, {})
  })

  after(function () {
    nock.cleanAll()
  })

  describe('not logged in', function () {
    let dropdownButton, navMenu

    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      render(<Default />)
      dropdownButton = screen.queryByRole('button', { name: 'ProjectHeader.exploreProject' })
      await user.click(dropdownButton)
      navMenu = await screen.findByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the menu button', function () {
      expect(dropdownButton).toBeDefined()
    })

    it('should open the navigation menu', function () {
      expect(navMenu).toBeDefined()
    })

    it('should display the default nav links', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal(
        'https://localhost/projects/zooniverse/snapshot-serengeti/collections'
      )
    })
  })

  describe('logged in', function () {
    let dropdownButton, navMenu

    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      render(<LoggedIn />)
      dropdownButton = screen.queryByRole('button', { name: 'ProjectHeader.exploreProject' })
      await user.click(dropdownButton)
      navMenu = await screen.findByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the menu button', function () {
      expect(dropdownButton).toBeDefined()
    })

    it('should open the navigation menu', function () {
      expect(navMenu).toBeDefined()
    })

    it('should include recents in the project navigation', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/projects/zooniverse/snapshot-serengeti/recents')
    })
  })

  describe('admin mode', function () {
    let dropdownButton, navMenu

    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      render(<AdminMode />)
      dropdownButton = screen.queryByRole('button', { name: 'ProjectHeader.exploreProject' })
      await user.click(dropdownButton)
      navMenu = await screen.findByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the menu button', function () {
      expect(dropdownButton).toBeDefined()
    })

    it('should open the navigation menu', function () {
      expect(navMenu).toBeDefined()
    })

    it('should show the admin page link', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://www.zooniverse.org/admin/project_status/zooniverse/snapshot-serengeti')
    })
  })

  describe('with organization link', function () {
    let dropdownButton, navMenu

    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      render(<WithOrganizationLink />)
      dropdownButton = screen.queryByRole('button', { name: 'ProjectHeader.exploreProject' })
      await user.click(dropdownButton)
      navMenu = await screen.findByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the menu button', function () {
      expect(dropdownButton).toBeDefined()
    })

    it('should open the navigation menu', function () {
      expect(navMenu).toBeDefined()
    })

    it('should show the organization link', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/organizations/zooniverse/snapshot-safari')
    })
  })
})
