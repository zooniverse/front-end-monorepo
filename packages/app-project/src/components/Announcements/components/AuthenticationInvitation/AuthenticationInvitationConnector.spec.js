import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'

import AuthenticationInvitationConnector from './AuthenticationInvitationConnector.js'

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
    it('should not be visible with sessionCount < 5', function () {
      render(
        <Provider store={defaultStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.be.null()
    })

    it('should be visible with sessionCount > 5', function () {
      render(
        <Provider store={sessionCountFiveStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      expect(
        screen.getByText('Announcements.AuthenticationInvitation.announcement')
      ).to.be.ok()
    })
  })

  describe('when the project is finished', function () {
    it('should not be visible', function () {
      render(
        <Provider store={projectFinishedStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.be.null()
    })
  })

  describe('when the user is logged in', function () {
    it('should not be visible', function () {
      render(
        <Provider store={loggedInUserStore}>
          <AuthenticationInvitationConnector />
        </Provider>
      )
      expect(
        screen.queryByText(
          'Announcements.AuthenticationInvitation.announcement'
        )
      ).to.be.null()
    })
  })
})
