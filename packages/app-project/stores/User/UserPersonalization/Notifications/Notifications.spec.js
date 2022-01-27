import { expect } from 'chai'
import { sugarClient } from 'panoptes-client/lib/sugar'
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
    sinon.stub(sugarClient, 'subscribeTo')
    sinon.stub(sugarClient, 'on')
    sinon.stub(sugarClient, 'unsubscribeFrom')
  })

  after(function () {
    statsClient.request.restore()
    sugarClient.subscribeTo.restore()
    sugarClient.on.restore()
    sugarClient.unsubscribeFrom.restore()
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

  describe('Actions > processSugarNotification', function () {
    describe('with Sugar event of source_type Comment', function () {
      const sugarEvent = {
        channel: 'user:123',
        data: {
          delivered: false,
          id: 72,
          source_type: 'Comment',
          type: 'notification',
          user_id: 123
        },
        type: 'notification'
      }
      
      const notificationsStore = Notifications.create({
        count: 4
      })

      it('should increment count', function () {
        expect(notificationsStore.count).to.equal(4)
        
        notificationsStore.processSugarNotification(sugarEvent)
  
        expect(notificationsStore.count).to.equal(5)
      })
    })

    describe('with Sugar event of source_type Message', function () {
      const sugarEvent = {
        channel: 'user:123',
        data: {
          delivered: false,
          id: 72,
          source_type: 'Message',
          type: 'notification',
          user_id: 123
        },
        type: 'notification'
      }
      
      const notificationsStore = Notifications.create({
        count: 6
      })

      it('should not increment count', function () {
        expect(notificationsStore.count).to.equal(6)
        
        notificationsStore.processSugarNotification(sugarEvent)
  
        expect(notificationsStore.count).to.equal(6)
      })
    })

    describe('with Sugar event of source_type Moderation', function () {
      const sugarEvent = {
        channel: 'user:123',
        data: {
          delivered: false,
          id: 72,
          source_type: 'Moderation',
          type: 'notification',
          user_id: 123
        },
        type: 'notification'
      }
      
      const notificationsStore = Notifications.create({
        count: 7
      })

      it('should not increment count', function () {
        expect(notificationsStore.count).to.equal(7)
        
        notificationsStore.processSugarNotification(sugarEvent)
  
        expect(notificationsStore.count).to.equal(7)
      })
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
