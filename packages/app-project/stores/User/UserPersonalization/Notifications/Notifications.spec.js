import { expect } from 'chai'
import { sugarClient } from 'panoptes-client/lib/sugar'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { talkAPI } from '@zooniverse/panoptes-js'

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

  describe('Actions > fetchInitialUnreadConversationsIds', function () {
    describe('when there is a resource in the response', function () {
      const mockResponse = {
        body: {
          conversations: [
            { id: '1' },
            { id: '2' },
            { id: '3' }
          ],
          meta: {
            next_page: undefined
          }
        }
      }

      before(function () {
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(mockResponse))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkAPI.get.restore()
      })

      it('should exist', function () {
        expect(rootStore.user.personalization.notifications).to.be.ok()
      })

      it('should set the initial unreadConversationsIds', function () {
        expect(rootStore.user.personalization.notifications.unreadConversationsIds.length).to.equal(3)
      })
    })

    describe('when there is a resource and additional pages in the response', function () {
      const firstMockResponse = {
        body: {
          conversations: [
            { id: '1' },
            { id: '2' },
            { id: '3' }
          ],
          meta: {
            next_page: 2
          }
        }
      }

      const secondMockResponse = {
        body: {
          conversations: [
            { id: '4' },
            { id: '5' }
          ],
          meta: {
            next_page: undefined
          }
        }
      }

      before(function () {
        sinon.stub(talkAPI, 'get')
          .callsFake((url, query, authorization) => {
            if (query.page === 1) {
              return Promise.resolve(firstMockResponse)
            }
            if (query.page === 2) {
              return Promise.resolve(secondMockResponse)
            }
            return Promise.resolve(new Error('Something went wrong'))
          })

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkAPI.get.restore()
      })

      it('should exist', function () {
        expect(rootStore.user.personalization.notifications).to.be.ok()
      })

      it('should set the initial unreadConversationsIds', function () {
        expect(rootStore.user.personalization.notifications.unreadConversationsIds.length).to.equal(5)
      })
    })

    describe('when there is not a resource in the response', function () {
      before(function () {
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(undefined))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkAPI.get.restore()
      })

      it('should keep the unreadConversationsIds as an empty array', function () {
        expect(rootStore.user.personalization.notifications.unreadConversationsIds.length).to.equal(0)
      })
    })

    describe('when the request errors', function () {
      before(function () {
        sinon.stub(console, 'error')
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.reject(new Error('Error!')))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        console.error.restore()
        talkAPI.get.restore()
      })

      it('should keep the unreadConversationsIds as an empty array', function () {
        expect(rootStore.user.personalization.notifications.unreadConversationsIds.length).to.equal(0)
      })

      it('should store the error', function () {
        expect(rootStore.user.personalization.notifications.error)
          .to.be.instanceOf(Error)
          .and.have.property('message', 'Error!')
      })
    })
  })

  describe('Actions > fetchInitialUnreadNotificationsCount', function () {
    describe('when there is a resource in the response', function () {
      const mockResponse = {
        body: {
          meta: {
            notifications: {
              count: 5
            }
          }
        }
      }

      before(function () {
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(mockResponse))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkAPI.get.restore()
      })

      it('should exist', function () {
        expect(rootStore.user.personalization.notifications).to.be.ok()
      })

      it('should set the initial unreadNotificationsCount', function () {
        expect(rootStore.user.personalization.notifications.unreadNotificationsCount).to.equal(5)
      })
    })

    describe('when there is not a resource in the response', function () {
      before(function () {
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(undefined))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        talkAPI.get.restore()
      })

      it('should keep the unreadNotificationsCount as zero', function () {
        expect(rootStore.user.personalization.notifications.unreadNotificationsCount).to.equal(0)
      })
    })

    describe('when the request errors', function () {
      before(function () {
        sinon.stub(console, 'error')
        sinon.stub(talkAPI, 'get').callsFake(() => Promise.reject(new Error('Error!')))

        rootStore = initStore(true, {
          user
        })
      })

      after(function () {
        console.error.restore()
        talkAPI.get.restore()
      })

      it('should keep the unreadNotificationsCount as zero', function () {
        expect(rootStore.user.personalization.notifications.unreadNotificationsCount).to.equal(0)
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
        unreadNotificationsCount: 4
      })

      it('should increment unreadNotificationsCount', function () {
        expect(notificationsStore.unreadNotificationsCount).to.equal(4)

        notificationsStore.processSugarNotification(sugarEvent)

        expect(notificationsStore.unreadNotificationsCount).to.equal(5)
      })
    })

    describe('with Sugar event of source_type Message, from known unread conversation', function () {
      const sugarEvent = {
        channel: 'user:123',
        data: {
          delivered: false,
          id: 72,
          source_type: 'Message',
          type: 'notification',
          url: 'https://pfe-preview.zooniverse.org/inbox/123',
          user_id: 123
        },
        type: 'notification'
      }

      const notificationsStore = Notifications.create({
        unreadConversationsIds: ['123'],
        unreadNotificationsCount: 6
      })

      it('should increment unreadNotificationsCount, not increment unreadConversationsIds length', function () {
        expect(notificationsStore.unreadConversationsIds.length).to.equal(1)
        expect(notificationsStore.unreadNotificationsCount).to.equal(6)

        notificationsStore.processSugarNotification(sugarEvent)

        expect(notificationsStore.unreadConversationsIds.length).to.equal(1)
        expect(notificationsStore.unreadNotificationsCount).to.equal(7)
      })
    })

    describe('with Sugar event of source_type Message, from new unread conversation', function () {
      const sugarEvent = {
        channel: 'user:123',
        data: {
          delivered: false,
          id: 72,
          source_type: 'Message',
          type: 'notification',
          url: 'https://pfe-preview.zooniverse.org/inbox/456',
          user_id: 123
        },
        type: 'notification'
      }

      const notificationsStore = Notifications.create({
        unreadConversationsIds: ['123'],
        unreadNotificationsCount: 6
      })

      it('should increment unreadNotificationsCount and unreadConversationsIds length', function () {
        expect(notificationsStore.unreadConversationsIds.length).to.equal(1)
        expect(notificationsStore.unreadNotificationsCount).to.equal(6)

        notificationsStore.processSugarNotification(sugarEvent)

        expect(notificationsStore.unreadConversationsIds.length).to.equal(2)
        expect(notificationsStore.unreadNotificationsCount).to.equal(7)
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
        unreadNotificationsCount: 7
      })

      it('should not increment count', function () {
        expect(notificationsStore.unreadNotificationsCount).to.equal(7)

        notificationsStore.processSugarNotification(sugarEvent)

        expect(notificationsStore.unreadNotificationsCount).to.equal(7)
      })
    })
  })

  describe('Actions > reset', function () {
    it('should reset the unreadNotificationsCount, unreadConversationsIds, and loadingState', function () {
      const notificationsStore = Notifications.create({
        unreadConversationsIds: ['1', '2', '3'],
        unreadNotificationsCount: 9,
        loadingState: asyncStates.success
      })

      expect(notificationsStore.unreadConversationsIds.length).to.equal(3)
      expect(notificationsStore.unreadNotificationsCount).to.equal(9)
      expect(notificationsStore.loadingState).to.equal(asyncStates.success)

      notificationsStore.reset()

      expect(notificationsStore.unreadConversationsIds.length).to.equal(0)
      expect(notificationsStore.unreadNotificationsCount).to.equal(0)
      expect(notificationsStore.loadingState).to.equal(asyncStates.initialized)
    })
  })
})
