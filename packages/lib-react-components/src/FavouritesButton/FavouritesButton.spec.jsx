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
      expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      expect(screen.getByText('Add to favorites')).to.exist()
    })

    it('should toggle favourites on', async function () {
      await user.click(screen.getByRole('checkbox', { checked: false }))
      expect(screen.getByRole('checkbox', { checked: true })).to.exist()
      expect(screen.getByText('Added to favorites')).to.exist()
    })

    it('should toggle favourites on then off', async function () {
      await user.click(screen.getByRole('checkbox', { checked: false}))
      await user.click(screen.getByRole('checkbox', { checked: true }))
      expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      expect(screen.getByText('Add to favorites')).to.exist()
    })
  })

  describe('when favourited', function () {
    const FavouritedStory = composeStory(Favourited, Meta)

    beforeEach(function () {
      render(<FavouritedStory />)
    })

    it('should show a favourited icon', function () {
      expect(screen.getByRole('checkbox', { checked: true })).to.exist()
      expect(screen.getByText('Added to favorites')).to.exist()
    })

    it('should toggle favourites off', async function () {
      await user.click(screen.getByRole('checkbox', { checked: true}))
      expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      expect(screen.getByText('Add to favorites')).to.exist()
    })

    it('should toggle favourites off then on', async function () {
      await user.click(screen.getByRole('checkbox', { checked: true}))
      await user.click(screen.getByRole('checkbox', { checked: false }))
      expect(screen.getByRole('checkbox', { checked: true })).to.exist()
      expect(screen.getByText('Added to favorites')).to.exist()
    })
  })

  describe('when disabled', function () {
    const DisabledStory = composeStory(Disabled, Meta)

    beforeEach(function () {
      render(<DisabledStory />)
    })

    it('should not be clickable', async function () {
      expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      expect(screen.getByText('Add to favorites')).to.exist()
      await user.click(screen.getByRole('checkbox', { checked: false}))
      expect(screen.getByRole('checkbox', { checked: false })).to.exist()
      expect(screen.getByText('Add to favorites')).to.exist()
    })
  })
})
