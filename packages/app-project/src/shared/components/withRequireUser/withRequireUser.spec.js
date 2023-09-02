import { render, screen } from '@testing-library/react'
import { withRequireUserText } from './withRequireUser.mock'
import Meta, { LoggedIn, LoggedOut } from './withRequireUser.stories'
import specStory from '@storybook_config/specStory'

describe('withRequireUser', function () {
  describe('behavior when logged in', function () {
    beforeEach(function () {
      const LoggedInStory = specStory(LoggedIn, Meta)
      render(<LoggedInStory />)
    })

    it('should render the wrapped component', function () {
      expect(screen.getByText(withRequireUserText)).to.exist()
    })

    it('shouldn\'t include a message to log in', function () {
      // doesn't have translation so we use the key
      expect(screen.queryByText('RequireUser.text')).to.be.null()
    })
  })

  describe('behavior when not logged in', function () {
    beforeEach(function () {
      const LoggedOutStory = specStory(LoggedOut, Meta)
      render(<LoggedOutStory />)
    })

    it('should render the wrapped component', function () {
      expect(screen.getByText(withRequireUserText)).to.exist()
    })

    it('should include a message to log in', function () {
      // doesn't have translation so we use the key
      expect(screen.queryByText('RequireUser.text')).to.exist()
    })
  })

})
