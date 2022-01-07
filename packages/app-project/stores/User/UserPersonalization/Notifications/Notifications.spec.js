import { expect } from 'chai'
import nock from 'nock'
// import { sugarClient } from 'panoptes-client/lib/sugar'
import talkClient from 'panoptes-client/lib/talk-client'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import { statsClient } from '../YourStats'
import Notifications from './Notifications'

describe('Stores > Notifications', function () {
  let rootStore

  const user = {
    id: '123',
    loadingState: asyncStates.success,
    login: 'test-user'
  }

  before(function () {
    sinon.stub(statsClient, 'request')
  })

  after(function () {
    statsClient.request.restore()
  })

  describe('Actions > fetchInitialUnreadNotifications', function () {
    describe('when there is a resource in the response', function () {
      const mockResponse = [
        {
          href: '/notifications/7',
          delivered: false,
          id: '7',
          message: 'other user has sent you a message',
          project_id: '',
          section: 'zooniverse',
          source_type: 'Message',
          user_id: '123',
          getMeta: () => ({ count: 5 })
        }
      ]

      before(function() {
        sinon.stub(talkClient, 'request').callsFake(() => Promise.resolve(mockResponse))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkClient.request.restore()
      })

      it('should exist', function () {
        expect(rootStore.user.personalization.notifications).to.be.ok()
      })

      it('should set the initial unread notifications count', function () {
        expect(rootStore.user.personalization.notifications.count).to.equal(5)
      })
    })

    describe('when there is not a resource in the response', function () {
      before(function() {
        sinon.stub(talkClient, 'request').callsFake(() => Promise.resolve([]))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkClient.request.restore()
      })
      
      it('should keep the unread notifications count as null', function () {
        expect(rootStore.user.personalization.notifications.count).to.be.null()
      })
    })

    describe('when the request errors', function () {
      before(function() {
        sinon.stub(console, 'error')
        sinon.stub(talkClient, 'request').callsFake(() => Promise.reject(new Error('Error!')))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        console.error.restore()
        talkClient.request.restore()
      })
      
      it('should keep the unread notifications count as null', function () {
        expect(rootStore.user.personalization.notifications.count).to.be.null()
      })

      it('should store the error', function () {
        expect(rootStore.user.personalization.notifications.error)
          .to.be.instanceOf(Error)
          .and.have.property('message', 'Error!')
      })
    })
  })

  xdescribe('Actions > processSugarNotification', function () {
    it('should ...', function () {
      expect(true).to.be.false()
    })
  })

  xdescribe('Actions > subscribeToSugarNotifications', function () {
    it('should ...', function () {
      expect(true).to.be.false()
    })
  })

  xdescribe('Actions > unsubscribeFromSugarNotifications', function () {
    it('should ...', function () {
      expect(true).to.be.false()
    })
  })

  describe('Actions > reset', function () {
    it('should reset the count and loadingState', function () {
      const notificationsStore = Notifications.create({
        count: 9,
        loadingState: asyncStates.success,
      })

      expect(notificationsStore.count).to.equal(9)
      expect(notificationsStore.loadingState).to.equal(asyncStates.success)

      notificationsStore.reset()

      expect(notificationsStore.count).to.be.null()
      expect(notificationsStore.loadingState).to.equal(asyncStates.initialized)
    })
  })
})
