import { expect } from 'chai'
import sinon from 'sinon'
import { talkAPI } from '@zooniverse/panoptes-js'

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
    sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(undefined))
  })
  
  after(function () {
    talkAPI.get.restore()
  })

  it('should exist', function () {
    expect(rootStore.user.personalization).to.be.ok()
  })

  describe('with a user', function () {
    before(function () {
      rootStore.user.set(user)
    })

    after(function () {
      talkAPI.get.resetHistory()
    })

    it('should trigger the child Notifications store to request unread notifications', function () {
      expect(talkAPI.get).to.have.been.calledWith(
        '/notifications',
        { delivered: false, page_size: 1 },
        { authorization: 'Bearer ' }
      )
    })

    it('should trigger the child Notifications store to request unread conversations', function () {
      expect(talkAPI.get).to.have.been.calledWith(
        '/conversations',
        { unread: true, page: 1 },
        { authorization: 'Bearer ' }
      )
    })

    xit('should trigger the child Notifications store to subscribe to Sugar notifications', function () {
      expect(true).to.be.false()
    })
  })

  describe('with an anonymous user', function () {
    it('should not trigger the child Notifications store to request unread notifications or conversations', function () {
      expect(talkAPI.get).to.have.not.been.called()
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
