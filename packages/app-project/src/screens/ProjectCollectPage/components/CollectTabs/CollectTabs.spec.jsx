import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, LoggedIn } from './CollectTabs.stories'

describe('Component > CollectTabs', function () {
  describe('when logged out', function () {
    const DefaultStory = composeStory(Default, Meta)

    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should show a favorites tab link', function () {
      const link = screen.getByRole('link', { name: 'Favorites' })
      expect(link.getAttribute('href')).to.equal('/test-owner/test-project/favorites')
    })

    it('should show a collections tab link', function () {
      const link = screen.getByRole('link', { name: 'Collections' })
      expect(link.getAttribute('href')).to.equal('/test-owner/test-project/collections')
    })

    it('should mark the active tab as current', function () {
      const link = screen.getByRole('link', { name: 'Favorites' })
      expect(link.getAttribute('aria-current')).to.equal('page')
    })

    it('should not show links to a logged in user\'s favorites or collections', function () {
      expect(screen.queryByRole('link', { name: 'My Test Project Favorites' })).to.be.null
      expect(screen.queryByRole('link', { name: 'My Test Project Collections' })).to.be.null
    })
  })

  describe('when logged in', function () {
    const LoggedInStory = composeStory(LoggedIn, Meta)

    beforeEach(function () {
      render(<LoggedInStory />)
    })

    it('should show links to the logged in user\'s favorites and collections', function () {
      const favoritesLink = screen.getByRole('link', { name: 'My Test Project Favorites' })
      expect(favoritesLink.getAttribute('href')).to.equal('/test-owner/test-project/favorites/test-user')

      const collectionsLink = screen.getByRole('link', { name: 'My Test Project Collections' })
      expect(collectionsLink.getAttribute('href')).to.equal('/test-owner/test-project/collections/test-user')
      expect(collectionsLink.getAttribute('aria-current')).to.equal('page')
    })
  })
})
