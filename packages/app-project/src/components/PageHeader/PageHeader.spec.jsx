import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'

import PageHeader from './PageHeader'
import initStore from '@stores'

describe('Component > PageHeader', function () {
  describe('with no user signed-in', function () {
    const mockStore = initStore(true)

    const snapshot = {
      user: {
        admin: false
      }
    }
    applySnapshot(mockStore, snapshot)

    beforeEach(function () {
      render(
        <Provider store={mockStore}>
          <PageHeader />
        </Provider>
      )
    })

    it('should display Sign-in and Register buttons', function () {
      expect(screen.getByText('Sign In')).toBeDefined()
      expect(screen.getByText('Register')).toBeDefined()
    })

    it('should not display the user menu', function () {
      const dropButton = screen.queryByRole('button', { name: 'Test User' })
      expect(dropButton).to.equal(null)
    })
  })

  describe('fetching signed-in user notifications', function () {
    const mockStore = initStore(true)

    const snapshot = {
      user: {
        admin: false,
        display_name: 'Test User',
        id: '123',
        loadingState: asyncStates.success,
        login: 'test-user',
        personalization: {
          notifications: {
            unreadConversationsIds: ['1', '2', '3'],
            unreadNotificationsCount: 2
          }
        }
      }
    }
    applySnapshot(mockStore, snapshot)

    before(function () {
      render(
        <Provider store={mockStore}>
          <PageHeader />
        </Provider>
      )
    })

    it('should display the number of unread notifications and messages', function () {
      expect(screen.getByText(`Notifications (${snapshot.user.personalization.notifications.unreadNotificationsCount})`)).toBeDefined()
      expect(screen.getByText(`Messages (${snapshot.user.personalization.notifications.unreadConversationsIds.length})`)).toBeDefined()
    })

    it('should not display sign-in or register buttons', function () {
      expect(screen.queryByText('Sign In')).to.equal(null)
      expect(screen.queryByText('Register')).to.equal(null)
    })

    it('should display user menu dropdown', function () {
      const dropButton = screen.findByRole('button', { name: 'Test User' })
      expect(dropButton).toBeDefined()
    })
  })
})
