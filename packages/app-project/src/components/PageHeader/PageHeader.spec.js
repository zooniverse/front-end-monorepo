import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { talkAPI } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import { sugarClient } from 'panoptes-client/lib/sugar'

import { PanoptesAuthContext } from '../../contexts'
import PageHeader from './PageHeader'

describe('Component > PageHeader', function () {
  describe('with no user signed-in', function () {
    beforeEach(function () {
      render(
        <PanoptesAuthContext.Provider value={{ user: {} }}>
          <PageHeader />
        </PanoptesAuthContext.Provider>
      )
    })

    it('should have a <header> with aria-label', function() {
      expect(screen.getAllByLabelText('PageHeader.headerLabel')).exists()
    })

    it('should display Sign-in and Register buttons', function () {
      expect(screen.getByText('Sign In')).exists()
      expect(screen.getByText('Register')).exists()
    })

    it('should not display the user menu', function () {
      const dropButton = screen.queryByRole('button', { name: 'Test User' })
      expect(dropButton).to.be.null()
    })
  })

  describe('fetching signed-in user notifications', function () {
    const mockUser = {
      display_name: 'Test User',
      id: '123',
      loadingState: asyncStates.success,
      login: 'test-user'
    }

    const mockResponse = {
      body: {
        conversations: [{ id: '1' }, { id: '2' }, { id: '3' }],
        meta: {
          next_page: undefined,
          notifications: {
            count: 2
          }
        }
      }
    }

    before(function () {
      // stub checkBearerToken() because it's called in useUnreadNotifications() before talkAPI.get()
      sinon.stub(auth, 'checkBearerToken').callsFake(() => Promise.resolve('12345'))
      sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(mockResponse))
      sinon.stub(sugarClient, 'subscribeTo')
      sinon.stub(sugarClient, 'on')
      sinon.stub(sugarClient, 'unsubscribeFrom')

      render(
        <PanoptesAuthContext.Provider value={{ user: mockUser }}>
          <PageHeader />
        </PanoptesAuthContext.Provider>
      )
    })

    after(function () {
      auth.checkBearerToken.restore()
      talkAPI.get.restore()
      sugarClient.subscribeTo.restore()
      sugarClient.on.restore()
      sugarClient.unsubscribeFrom.restore()
    })

    it('should display the number of unread notifications and messages', function () {
      expect(screen.getByText(`Notifications (${mockResponse.body.meta.notifications.count})`)).exists()
      expect(screen.getByText(`Messages (${mockResponse.body.conversations.length})`)).exists()
    })

    it('should not display sign-in or register buttons', function () {
      expect(screen.queryByText('Sign In')).to.be.null()
      expect(screen.queryByText('Register')).to.be.null()
    })

    it('should display user menu dropdown', function () {
      const dropButton = screen.findByRole('button', { name: 'Test User' })
      expect(dropButton).exists()
    })
  })
})
