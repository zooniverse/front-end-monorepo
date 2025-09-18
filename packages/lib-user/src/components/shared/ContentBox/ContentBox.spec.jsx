import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { TopProjectsFull, NoTitle, NoLink, NoTitleNoLink } from './ContentBox.stories'

describe('components > shared > ContentBox', function () {
  describe('with title and link', function () {
    const TopProjectsFullStory = composeStory(TopProjectsFull, Meta)

    it('should render the title', function () {
      render(<TopProjectsFullStory />)
      expect(screen.getByText('Top Projects')).toBeTruthy()
    })

    it('should render the link', function () {
      render(<TopProjectsFullStory />)
      expect(screen.getByRole('link', { name: 'See more' })).toBeTruthy()
    })
  })

  describe('with no title', function () {
    const NoTitleStory = composeStory(NoTitle, Meta)

    it('should not render the title', function () {
      render(<NoTitleStory />)
      expect(screen.queryByText('Top Projects')).to.equal(null)
    })

    it('should render the link', function () {
      render(<NoTitleStory />)
      expect(screen.getByRole('link', { name: 'See more' })).toBeTruthy()
    })
  })

  describe('with no link', function () {
    const NoLinkStory = composeStory(NoLink, Meta)

    it('should render the title', function () {
      render(<NoLinkStory />)
      expect(screen.getByText('No link')).toBeTruthy()
    })

    it('should not render the link', function () {
      render(<NoLinkStory />)
      expect(screen.queryByRole('link')).to.equal(null)
    })
  })

  describe('with no title and no link', function () {
    const NoTitleNoLinkStory = composeStory(NoTitleNoLink, Meta)

    it('should not render the title', function () {
      render(<NoTitleNoLinkStory />)
      expect(screen.queryByText('Top Projects')).to.equal(null)
    })

    it('should not render the link', function () {
      render(<NoTitleNoLinkStory />)
      expect(screen.queryByRole('link')).to.equal(null)
    })
  })
})
