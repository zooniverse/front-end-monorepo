import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { OnCurrentPage, NotOnCurrentPage } from './NavLink.stories'
import { NavLinkMock } from './NavLink.mock.js'

describe('Component > NavLink', function () {
  describe('when on current page', function () {
    beforeEach(function () {
      const OnCurrentPageStory = composeStory(OnCurrentPage, Meta)
      render(<OnCurrentPageStory />)
    })

    it('should have the correct link', function () {
      expect(screen.getByRole('link').getAttribute('href')).to.equal(NavLinkMock.href)
    })

    it('should have the correct text', function () {
      expect(screen.getByText(NavLinkMock.text)).toBeDefined()
    })
  })

  describe('when not on current page', function () {
    beforeEach(function () {
      const NotOnCurrentPageStory = composeStory(NotOnCurrentPage, Meta)
      render(<NotOnCurrentPageStory />)
    })

    it('should have the correct link', function () {
      expect(screen.getByRole('link').getAttribute('href')).to.equal(NavLinkMock.href)
    })

    it('should have the correct text', function () {
      expect(screen.getByText(NavLinkMock.text)).toBeDefined()
    })
  })
})
