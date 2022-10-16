import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import nock from 'nock'

import * as Stories from './ProjectHeader.stories.js'

describe('Component > ProjectHeader', function () {
  let languageButton, navMenu, projectAvatar, projectBackground, projectTitle

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

  describe('default behaviour', function () {
    before(function () {
      render(<Stories.NotLoggedIn {...Stories.NotLoggedIn.args} />)
      projectAvatar = screen.getByRole('img', { name: 'ProjectHeader.Avatar.alt' })
      projectBackground = document.querySelector(`div[aria-hidden] div[data-src='https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg']`)
      projectTitle = screen.getByRole('heading', { level: 1, name: 'Snapshot Serengeti' })
      navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      languageButton = screen.queryByRole('button', { name: 'ProjectHeader.LocaleSwitcher.label'})
    })

    it('should display the project title', function () {
      expect(projectTitle).to.be.ok()
    })

    it('should show the project avatar', function () {
      expect(projectAvatar).to.exist()
    })

    it('should show the project background', function () {
      expect(projectBackground).to.exist()
    })

    it('should show the project navigation menu', function () {
      expect(navMenu).to.exist()
    })

    it('should not show the language menu button', function () {
      expect(languageButton).to.be.null()
    })
  })

  describe('when not logged in', function () {
    let navLinks

    before(function () {
      const { NotLoggedIn } = Stories
      render(<NotLoggedIn {...NotLoggedIn.args} />)
      const navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      navLinks = within(navMenu).getAllByRole('link')
    })

    it('should display the default nav links', function () {
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal(
        'https://localhost/zooniverse/snapshot-serengeti/collections'
      )
    })
  })

  describe('when logged in', function () {
    it('should include recents in the project navigation', function () {
      const { LoggedIn } = Stories
      render(<LoggedIn {...LoggedIn.args} />)
      const navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/recents')
    })
  })

  describe('in beta', function () {
    let approvedIcon, underReviewLabel

    before(function () {
      const { InBeta } = Stories
      render(<InBeta {...InBeta.args} />)
      approvedIcon = screen.queryByLabelText('ProjectHeader.ApprovedIcon.title')
      underReviewLabel = screen.queryByText('ProjectHeader.UnderReviewLabel.underReview')
    })

    it('should show the Under Review label', function () {
      expect(underReviewLabel).to.exist() 
    })

    it('should not show the approved badge', function () {
      expect(approvedIcon).to.be.null()
    })
  })

  describe('launch approved', function () {
    let approvedIcon, underReviewLabel

    before(function () {
      const { LaunchApproved } = Stories
      render(<LaunchApproved {...LaunchApproved.args} />)
      approvedIcon = screen.queryByLabelText('ProjectHeader.ApprovedIcon.title')
      underReviewLabel = screen.queryByText('ProjectHeader.UnderReviewLabel.underReview')
    })

    it('should not show the Under Review label', function () {
      expect(underReviewLabel).to.be.null()
    })

    it('should show the approved badge', function () {
      expect(approvedIcon).to.exist()
    })
  })

  describe('in admin mode', function () {
    it('should show the admin page link', function () {
      const { AdminMode } = Stories
      render(<AdminMode {...AdminMode.args} />)
      const navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal('https://www.zooniverse.org/admin/project_status/zooniverse/snapshot-serengeti')
    })
  })

  describe('with a default workflow', function () {
    it('should display a workflow-specific classify link', function () {
      const { DefaultWorkflow } = Stories
      render(<DefaultWorkflow {...DefaultWorkflow.args} />)
      const navMenu = screen.getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/about/research')
      expect(navLinks[1].href).to.equal('https://localhost/zooniverse/snapshot-serengeti/classify/workflow/1234')
    })
  })

  describe('with multiple languages', function () {
    let languageButton

    before(function () {
      const { MultipleLanguages } = Stories
      render(<MultipleLanguages {...MultipleLanguages.args} />)
      languageButton = screen.getByRole('button', { name: 'ProjectHeader.LocaleSwitcher.label'})
    })

    it('should show the language menu button', async function () {
      expect(languageButton).to.exist()
    })
  })
})
