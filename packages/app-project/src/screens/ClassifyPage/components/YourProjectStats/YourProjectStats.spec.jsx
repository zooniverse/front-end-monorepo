import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { NoUser, WithUser, Error } from './YourProjectStats.stories'

const NoUserStory = composeStory(NoUser, Meta)
const WithUserStory = composeStory(WithUser, Meta)
const ErrorStory = composeStory(Error, Meta)

describe('Component > YourProjectStats', function() {
  describe('without a signed in user', function() {
    beforeEach(function() {
      render(<NoUserStory />)
    })

    it('should show the RequireUser message', function() {
      expect(screen.getByText('RequireUser.text')).toBeDefined()
    })

    it('should not have a link to user /stats page', function() {
      expect(screen.queryByText('Classify.YourStats.link')).to.equal(null)
    })
  })

  describe('with a signed in user', function() {
    beforeEach(function() {
      render(<WithUserStory />)
    })

    it('should have a link to the user /stats page', function() {
      expect(screen.getByText('Classify.YourStats.link')).toBeDefined()
    })

    it('should have a link with href to user /stats page filtered to the current project', function() {
      const link = document.querySelector(`a[href='https://www.zooniverse.org/users/zootester1/stats?project_id=1234']`)
      expect(link).toBeDefined()
    })

    it('should show user stats data', function() {
      const sevenDaysStatLabel = screen.getByText('Classify.YourStats.lastSeven')
      expect(sevenDaysStatLabel.nextElementSibling.innerHTML).to.equal('40')

      const allTimeStatLabel = screen.getByText('Classify.YourStats.allTime')
      expect(allTimeStatLabel.nextElementSibling.innerHTML).to.equal('9,436')
    })
  })

  describe('when fetching stats throws an error', function() {
    before(function() {
      render(<ErrorStory />)
    })

    it('should display the error message', function() {
      expect(screen.getByText('There was an error fetching your stats')).toBeDefined()
    })

    it('should not have a link to user /stats page', function() {
      expect(screen.queryByText('Classify.YourStats.link')).to.equal(null)
    })
  })
})
