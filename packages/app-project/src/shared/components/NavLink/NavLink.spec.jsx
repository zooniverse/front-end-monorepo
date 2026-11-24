import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { OnCurrentPage, NotOnCurrentPage } from './NavLink.stories'
import { NavLinkMock } from './NavLink.mock.js'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import NavLink from './NavLink'

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

  describe('with a link to a PFE page', function () {
    const talkLink = {
      externalLink: true,
      href: '/projects/foo/bar/talk',
      text: 'Talk'
    }

    function renderWithLocale(locale, link = talkLink) {
      const router = {
        asPath: '/foo/bar',
        basePath: '/projects',
        defaultLocale: 'en',
        locale,
        push() {},
        prefetch: () => Promise.resolve(),
        query: { owner: 'foo', project: 'bar' }
      }
      render(
        <RouterContext.Provider value={router}>
          <NavLink link={link} />
        </RouterContext.Provider>
      )
      return screen.getByRole('link').getAttribute('href')
    }

    it('should pass a non-default locale as the language query param', function () {
      expect(renderWithLocale('es')).to.equal('/projects/foo/bar/talk?language=es')
    })

    it('should not add a language for the default locale', function () {
      expect(renderWithLocale('en')).to.equal('/projects/foo/bar/talk')
    })

    it('should leave internal links to next/link', function () {
      const href = renderWithLocale('es', { href: '/foo/bar/about/research', text: 'About' })
      expect(href).not.to.include('language=')
    })
  })
})
