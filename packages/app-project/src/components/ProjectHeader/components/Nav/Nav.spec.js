import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import nock from 'nock'

import * as Stories from './Nav.stories.js'

function ThemedStory(Story) {
  return (
    <Grommet theme={zooTheme}>
      <Story />
    </Grommet>
  )
}

describe('Component > ProjectHeader > Nav', function () {
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
    let navMenu

    before(function () {
      render(ThemedStory(Stories.Default))
      navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the navigation menu', function () {
      expect(navMenu).to.exist()
    })

    it('should display the default nav links', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal(
        'https://localhost/zooniverse/snapshot-serengeti/collections'
      )
    })
  })

  describe('logged in', function () {
    let navMenu

    before(function () {
      render(ThemedStory(Stories.LoggedIn))
      navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the navigation menu', function () {
      expect(navMenu).to.exist()
    })

    it('should include recents in the project navigation', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/recents')
    })
  })

  describe('admin mode', function () {
    let navMenu

    before(async function () {
      render(ThemedStory(Stories.AdminMode))
      navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
    })

    it('should show the navigation menu', function () {
      expect(navMenu).to.exist()
    })

    it('should show the admin page link', function () {
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://www.zooniverse.org/admin/project_status/zooniverse/snapshot-serengeti')
    })
  })
})
