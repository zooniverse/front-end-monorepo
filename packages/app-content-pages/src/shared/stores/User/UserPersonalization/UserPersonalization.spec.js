import { expect } from 'chai'
import { when } from 'mobx'
import nock from 'nock'
import asyncStates from '@zooniverse/async-states'

import Store from '../../Store'
import UserPersonalization from './UserPersonalization'

describe('Stores > UserPersonalization', function () {
  let rootStore
  const user = {
    id: '123',
    login: 'test.user'
  }

  before(function () {
    rootStore = Store.create()
  })

  it('should exist', function () {
    expect(rootStore.user.personalization).to.be.ok()
  })

  describe('with an anonymous user', function () {
    it('should not trigger the child Notifications store to request unread notifications or conversations', function () {
      // a loading state of "initialized" means that the store has not requested (state would be "loading") or received (state would be "success" or "error") data
      expect(rootStore.user.personalization.notifications.conversationsLoadingState).to.equal(asyncStates.initialized)
      expect(rootStore.user.personalization.notifications.notificationsLoadingState).to.equal(asyncStates.initialized)
    })
  })

  describe('with a user', function () {
    before(async function () {
      rootStore.user.set(user)

      nock('https://talk-staging.zooniverse.org')
        .persist()
        .get('/conversations')
        .query(true)
        .reply(200)
        .get('/notifications')
        .query(true)
        .reply(200)

      const { notifications } = rootStore.user.personalization
      await when(() => notifications.conversationsLoadingState === asyncStates.success)
      await when(() => notifications.notificationsLoadingState === asyncStates.success)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should trigger the child Notifications store to request unread notifications and conversations', function () {
      expect(rootStore.user.personalization.notifications.conversationsLoadingState).to.equal(asyncStates.success)
      expect(rootStore.user.personalization.notifications.notificationsLoadingState).to.equal(asyncStates.success)
    })

    xit('should trigger the child Notifications store to subscribe to Sugar notifications', function () {
      expect(true).to.be.false()
    })
  })

  describe('on reset', function () {
    it('should reset notifications', function () {
      const personalizationStore = UserPersonalization.create({
        notifications: {
          unreadConversationsIds: ['246', '357'],
          unreadNotificationsCount: 5
        }
      })
      const signedInUserPersonalization = personalizationStore.toJSON()
      personalizationStore.reset()
      const signedOutUserPersonalization = personalizationStore.toJSON()
      expect(signedOutUserPersonalization).to.not.deep.equal(signedInUserPersonalization)
      expect(personalizationStore.notifications.unreadConversationsIds).to.deep.equal([])
      expect(personalizationStore.notifications.unreadNotificationsCount).to.equal(0)
    })
  })
})
