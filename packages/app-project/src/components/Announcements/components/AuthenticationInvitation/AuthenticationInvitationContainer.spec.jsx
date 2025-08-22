import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthenticationInvitationContainer from './AuthenticationInvitationContainer'

describe('Component > AuthenticationInvitationContainer', function () {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  describe('when visible', function () {
    it('should render an announcement banner', function () {
      render(<AuthenticationInvitationContainer isVisible />)
      expect(
        screen.getByText('Announcements.AuthenticationInvitation.announcement')
      ).to.be.ok()
    })
  })

  describe('when not visible', function () {
    it('should not render an announcement banner', function () {
      render(<AuthenticationInvitationContainer />)
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.be.null()
    })
  })

  describe('when dismissed', function () {
    const user = userEvent.setup()

    before(function () {
      render(
        <RouterContext.Provider value={mockRouter}>
          <AuthenticationInvitationContainer isVisible />
        </RouterContext.Provider>
      )
    })

    it('should not render an announcement banner', async function () {
      expect(
        screen.getByText('Announcements.AuthenticationInvitation.announcement')
      ).to.be.ok()

      const button = screen.getByLabelText('Close')
      await user.click(button)

      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.be.null()
    })
  })
})
