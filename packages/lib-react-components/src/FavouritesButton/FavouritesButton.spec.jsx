import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'
import Meta, { NotFavourited, Favourited, Disabled } from './FavouritesButton.stories'

describe('Component > FavouritesButton', function () {
  const user = userEvent.setup()

  describe('when not favourited', function () {
    const NotFavouritedStory = composeStory(NotFavourited, Meta)

    beforeEach(function () {
      render(<NotFavouritedStory />)
    })

    it('should not show a favourited icon', function () {
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })

    it('should toggle favourites on', async function () {
      await user.click(screen.getByRole('checkbox', { checked: false }))
      expect(screen.getByRole('checkbox', { checked: true })).toBeDefined()
      expect(screen.getByText('Added to favorites')).toBeDefined()
    })

    it('should toggle favourites on then off', async function () {
      await user.click(screen.getByRole('checkbox', { checked: false}))
      await user.click(screen.getByRole('checkbox', { checked: true }))
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })
  })

  describe('when favourited', function () {
    const FavouritedStory = composeStory(Favourited, Meta)

    beforeEach(function () {
      render(<FavouritedStory />)
    })

    it('should show a favourited icon', function () {
      expect(screen.getByRole('checkbox', { checked: true })).toBeDefined()
      expect(screen.getByText('Added to favorites')).toBeDefined()
    })

    it('should toggle favourites off', async function () {
      await user.click(screen.getByRole('checkbox', { checked: true}))
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })

    it('should toggle favourites off then on', async function () {
      await user.click(screen.getByRole('checkbox', { checked: true}))
      await user.click(screen.getByRole('checkbox', { checked: false }))
      expect(screen.getByRole('checkbox', { checked: true })).toBeDefined()
      expect(screen.getByText('Added to favorites')).toBeDefined()
    })
  })

  describe('when disabled', function () {
    const DisabledStory = composeStory(Disabled, Meta)

    beforeEach(function () {
      render(<DisabledStory />)
    })

    it('should not be clickable', async function () {
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
      expect(screen.getByText('Add to favorites')).toBeDefined()
      await user.click(screen.getByRole('checkbox', { checked: false}))
      expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()
      expect(screen.getByText('Add to favorites')).toBeDefined()
    })
  })
})
