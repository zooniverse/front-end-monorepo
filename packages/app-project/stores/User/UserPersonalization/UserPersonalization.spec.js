import { expect } from 'chai'
import nock from 'nock'
import auth from 'panoptes-client/lib/auth'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { talkAPI } from '@zooniverse/panoptes-js'

import initStore from '@stores/initStore'
import UserPersonalization from './UserPersonalization'
import { statsClient } from './YourStats'

describe('Stores > UserPersonalization', function () {
  let rootStore, nockScope
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }
  const user = {
    id: '123',
    login: 'test.user'
  }

  before(function () {
    const MOCK_DAILY_COUNTS = [
      { count: 12, period: '2019-09-29' },
      { count: 12, period: '2019-09-30' },
      { count: 13, period: '2019-10-01' },
      { count: 14, period: '2019-10-02' },
      { count: 10, period: '2019-10-03' },
      { count: 11, period: '2019-10-04' },
      { count: 8, period: '2019-10-05' },
      { count: 15, period: '2019-10-06' }
    ]
    nockScope = nock('https://panoptes-staging.zooniverse.org/api')
      .persist()
      .get('/project_preferences')
      .query(true)
      .reply(200, {
        project_preferences: [
          { activity_count: 23, id: '5' }
        ]
      })
      .get('/collections') // This is to get the collections store to not make real requests
      .query(true)
      .reply(200)
      .post('/collections')
      .query(true)
      .reply(200)
      .post('/oauth/token') // auth
      .query(true)
      .reply(200)
      .get('/me') // getting user
      .reply(200)

    rootStore = initStore(true, { project })
    sinon.spy(rootStore.client.panoptes, 'get')
    sinon.stub(statsClient, 'request').callsFake(() => Promise.resolve({ statsCount: MOCK_DAILY_COUNTS }))
    sinon.stub(talkAPI, 'get').callsFake(() => Promise.resolve(undefined))
  })

  after(function () {
    rootStore.client.panoptes.get.restore()
    statsClient.request.restore()
    talkAPI.get.restore()
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(rootStore.user.personalization).to.be.ok()
  })

  describe('with a project and user', function () {
    let clock

    before(function () {
      clock = sinon.useFakeTimers({ now: new Date(2019, 9, 1, 12), toFake: ['Date'] })
      rootStore.user.set(user)
    })

    after(function () {
      clock.restore()
      rootStore.client.panoptes.get.resetHistory()
      talkAPI.get.resetHistory()
    })

    it('should trigger the child UPP node store to request user preferences', function () {
      const authorization = 'Bearer '
      const endpoint = '/project_preferences'
      const query = {
        project_id: '2',
        user_id: '123'
      }
      expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
    })

    it('should trigger the child YourStats node to request user statistics', function () {
      const query = `{
        statsCount(
          eventType: "classification",
          interval: "1 Day",
          window: "1 Week",
          projectId: "2",
          userId: "123"
        ){
          period,
          count
        }
      }`
      expect(statsClient.request).to.have.been.calledOnceWith(query.replace(/\s+/g, ' '))
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

    describe('incrementing your classification count', function () {
      before(function () {
        const user = {
          id: '123',
          login: 'test.user',
          personalization: {
            projectPreferences: {
              activity_count: 23
            }
          }
        }
        rootStore = initStore(true, { project, user })
        rootStore.user.personalization.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(24)
      })

      it('should add 1 to your session count', function () {
        expect(rootStore.user.personalization.sessionCount).to.equal(1)
      })

      describe('every five classifications', function () {
        before(function () {
          rootStore.client.panoptes.get.resetHistory()
          rootStore.user.personalization.increment()
          rootStore.user.personalization.increment()
          rootStore.user.personalization.increment()
          rootStore.user.personalization.increment()
        })

        it('should request for the user project preferences', function () {
          const authorization = 'Bearer '
          const endpoint = '/project_preferences'
          const query = {
            project_id: '2',
            user_id: '123'
          }

          expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
          expect(rootStore.user.personalization.sessionCount).to.equal(5)
        })
      })
    })
  })

  describe('without a project and a user', function () {
    before(function () {
      const user = {
        id: '123',
        login: 'test.user',
        personalization: {
          projectPreferences: {
            activity_count: 23,
            id: '5'
          }
        }
      }
      rootStore = initStore(true, { project, user })
    })

    it('should reset the child project preferences', function () {
      expect(rootStore.user.personalization.projectPreferences.id).to.equal('5')
      rootStore.user.clear()
      expect(rootStore.user.personalization.projectPreferences.id).to.be.undefined()
    })
  })

  describe('with a project and anonymous user', function () {
    before(function () {
      rootStore = initStore(true, { project })
    })

    it('should not trigger the child UPP store to request user preferences from Panoptes', function () {
      expect(rootStore.client.panoptes.get).to.have.not.been.called()
    })

    it('should start counting from 0', function () {
      expect(rootStore.user.personalization.totalClassificationCount).to.equal(0)
    })

    it('should not trigger the child Notifications store to request unread notifications or conversations', function () {
      expect(talkAPI.get).to.have.not.been.called()
    })

    describe('when we successfully know there is an anonymous user', function () {
      before(function () {
        rootStore.user.set({})
      })

      it('should set the user project preferences load to success', function () {
        expect(rootStore.user.isLoggedIn).to.be.false()
        expect(rootStore.user.loadingState).to.equal(asyncStates.success)
        expect(rootStore.user.personalization.projectPreferences.loadingState).to.equal(asyncStates.success)
      })
    })

    describe('incrementing your classification count', function () {
      before(function () {
        rootStore.user.personalization.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(1)
      })
    })

    describe('incrementing your classification count to 5', function () {
      before(function () {
        rootStore.client.panoptes.get.resetHistory()
        rootStore.user.personalization.reset()
        rootStore.user.personalization.increment()
        rootStore.user.personalization.increment()
        rootStore.user.personalization.increment()
        rootStore.user.personalization.increment()
        rootStore.user.personalization.increment()
      })

      it('should add 5 to your total count', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(5)
      })

      it('should not trigger the child UPP store to request user preferences from Panoptes', function () {
        expect(rootStore.client.panoptes.get).to.have.not.been.called()
      })
    })
  })

  describe('when Zooniverse auth is down.', function () {
    before(function () {
      rootStore = initStore(true, { project })
      const user = {
        id: '123',
        login: 'test.user'
      }
      sinon.stub(auth, 'checkBearerToken').callsFake(() => Promise.reject(new Error('Auth is not available')))
      rootStore.user.set(user)
      rootStore.user.personalization.increment()
    })

    after(function () {
      auth.checkBearerToken.restore()
    })

    it('should count session classifications from 0', function () {
      expect(rootStore.user.personalization.totalClassificationCount).to.equal(1)
    })
  })

  describe('on Panoptes API errors', function () {
    before(function () {
      rootStore = initStore(true, { project })
      const user = {
        id: '123',
        login: 'test.user'
      }
      nockScope
        .get('/project_preferences')
        .query(true)
        .replyWithError('Panoptes is not available')
      rootStore.user.set(user)
      rootStore.user.personalization.increment()
    })

    it('should count session classifications from 0', function () {
      expect(rootStore.user.personalization.totalClassificationCount).to.equal(1)
    })
  })

  describe('counts view', function () {
    it('should return the expected counts with no data', function () {
      const personalizationStore = UserPersonalization.create()
      expect(personalizationStore.counts).to.deep.equal({
        today: 0,
        total: 0
      })
    })

    describe('total count', function () {
      it('should get the total count from the store `totalClassificationCount` value', function () {
        const personalizationStore = UserPersonalization.create()
        personalizationStore.increment()
        personalizationStore.increment()
        personalizationStore.increment()
        personalizationStore.increment()
        expect(personalizationStore.counts.total).to.equal(4)
      })
    })

    describe('today\'s count', function () {
      let clock

      before(function () {
        clock = sinon.useFakeTimers({ now: new Date(2019, 9, 1, 12), toFake: ['Date'] })
      })

      after(function () {
        clock.restore()
      })

      it('should get today\'s count from the store\'s counts for this week', function () {
        const MOCK_DAILY_COUNTS = [
          { count: 12, dayNumber: 1, period: '2019-09-30T00:00:00Z' },
          { count: 13, dayNumber: 2, period: '2019-10-01T00:00:00Z' },
          { count: 14, dayNumber: 3, period: '2019-10-02T00:00:00Z' },
          { count: 10, dayNumber: 4, period: '2019-10-03T00:00:00Z' },
          { count: 11, dayNumber: 5, period: '2019-10-04T00:00:00Z' },
          { count: 8, dayNumber: 6, period: '2019-10-05T00:00:00Z' },
          { count: 15, dayNumber: 0, period: '2019-10-06T00:00:00Z' }
        ]
        const personalizationStore = UserPersonalization.create({ stats: { thisWeek: MOCK_DAILY_COUNTS } })
        expect(personalizationStore.counts.today).to.equal(MOCK_DAILY_COUNTS[1].count)
      })

      it('should be `0` if there are no classifications today', function () {
        const MOCK_DAILY_COUNTS = [
          { count: 12, dayNumber: 2, period: '2019-01-03T00:00:00Z' },
          { count: 13, dayNumber: 1, period: '2019-01-02T00:00:00Z' },
          { count: 14, dayNumber: 0, period: '2019-01-01T00:00:00Z' }
        ]
        const personalizationStore = UserPersonalization.create({ stats: { thisWeek: MOCK_DAILY_COUNTS } })
        expect(personalizationStore.counts.today).to.equal(0)
      })
    })
  })

  describe('on reset', function () {
    it('should reset project preferences, stats, counts, and notifications', function () {
      const MOCK_DAILY_COUNTS = [
        { count: 12, dayNumber: 1, period: '2019-09-30T00:00:00Z' },
        { count: 13, dayNumber: 2, period: '2019-10-01T00:00:00Z' },
        { count: 14, dayNumber: 3, period: '2019-10-02T00:00:00Z' },
        { count: 10, dayNumber: 4, period: '2019-10-03T00:00:00Z' },
        { count: 11, dayNumber: 5, period: '2019-10-04T00:00:00Z' },
        { count: 8, dayNumber: 6, period: '2019-10-05T00:00:00Z' },
        { count: 15, dayNumber: 0, period: '2019-10-06T00:00:00Z' }
      ]
      const personalizationStore = UserPersonalization.create({
        notifications: {
          unreadConversationsIds: ['246', '357'],
          unreadNotificationsCount: 5
        },
        projectPreferences: {
          activity_count: 8,
          activity_count_by_workflow: {
            1234: 8,
          },
          id: '5',
          links: { project: '5678', user: '1' },
          loadingState: asyncStates.success,
          preferences: {
            tutorials_completed_at: {
              555: "2021-08-02T16:09:00.468Z"
            }
          },
          settings: { workflow_id: '4444' }
        },
        stats: {
          loadingState: asyncStates.success,
          thisWeek: MOCK_DAILY_COUNTS
        },
        totalClassificationCount: 8
      })
      personalizationStore.increment() // increment to have a session count
      const signedInUserPersonalization = personalizationStore.toJSON()
      expect(personalizationStore.sessionCount).to.equal(1)
      personalizationStore.reset()
      const signedOutUserPersonalization = personalizationStore.toJSON()
      expect(personalizationStore.sessionCount).to.equal(0)
      expect(signedOutUserPersonalization).to.not.deep.equal(signedInUserPersonalization)
      expect(personalizationStore.notifications.unreadConversationsIds).to.deep.equal([])
      expect(personalizationStore.notifications.unreadNotificationsCount).to.equal(0)
    })
  })
})
