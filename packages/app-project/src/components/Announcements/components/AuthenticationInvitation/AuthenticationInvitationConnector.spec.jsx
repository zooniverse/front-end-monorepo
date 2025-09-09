import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

/* This test suite uses vi.dynamicImportSettled because AuthenticationInvitationContainer
  is dynamically imported in AuthenticationInvitationConnector.
  https://v0.vitest.dev/api/vi.html#vi-dynamicimportsettled
*/

import AuthenticationInvitationConnector from './AuthenticationInvitationConnector'

describe('Component > AuthenticationInvitationConnector', function () {
  const defaultStore = {
    project: {
      isComplete: false
    },
    ui: {
      setAuthModalActiveIndex: () => {}
    },
    user: {
      isLoggedIn: false,
      personalization: {
        sessionCount: 0
      }
    }
  }

  const projectFinishedStore = {
    project: {
      isComplete: true
    },
    ui: {
      setAuthModalActiveIndex: () => {}
    },
    user: {
      isLoggedIn: false,
      personalization: {
        sessionCount: 0
      }
    }
  }

  const sessionCountFiveStore = {
    project: {
      isComplete: false
    },
    ui: {
      setAuthModalActiveIndex: () => {}
    },
    user: {
      isLoggedIn: false,
      personalization: {
        sessionCount: 5
      }
    }
  }

  const loggedInUserStore = {
    project: {
      isComplete: false
    },
    ui: {
      setAuthModalActiveIndex: () => {}
    },
    user: {
      isLoggedIn: true,
      personalization: {
        sessionCount: 5
      }
    }
  }

  describe('when the user is logged out and project is not finished ', function () {
    it('should not be visible with sessionCount < 5', async function () {
      render(
        <Provider store={defaultStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      await vi.dynamicImportSettled()
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.equal(null)
    })

    it('should be visible with sessionCount > 5', async function () {
      render(
        <Provider store={sessionCountFiveStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      await vi.dynamicImportSettled()
      expect(
        screen.getByText('Announcements.AuthenticationInvitation.announcement')
      ).toBeDefined()
    })
  })

  describe('when the project is finished', function () {
    it('should not be visible', async function () {
      render(
        <Provider store={projectFinishedStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      await vi.dynamicImportSettled()
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.equal(null)
    })
  })

  describe('when the user is logged in', function () {
    it('should not be visible', async function () {
      render(
        <Provider store={loggedInUserStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      await vi.dynamicImportSettled()
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.equal(null)
    })
  })
})
