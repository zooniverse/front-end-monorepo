import sinon from 'sinon'
import auth from 'panoptes-client/lib/auth'
import nock from 'nock'

import initStore from './initStore'
import UserPersonalization from './UserPersonalization'
import { statsClient } from './YourStats'

describe('Stores > UserPersonalization', function () {
  let rootStore, nockScope
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }

  before(function () {
    sinon.stub(console, 'error')
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
          { activity_count: 23 }
        ]
      })
      .get('/collections') // This is to get the collections store to not make real requests
      .query(true)
      .reply(200)
      .post('/collections')
      .query(true)
      .reply(200)
    rootStore = initStore(true, { project })
    sinon.spy(rootStore.client.panoptes, 'get')
    sinon.stub(statsClient, 'request').callsFake(() => Promise.resolve({ statsCount: MOCK_DAILY_COUNTS }))
  })

  after(function () {
    console.error.restore()
    rootStore.client.panoptes.get.restore()
    statsClient.request.restore()
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(rootStore.user.personalization).to.be.ok()
  })

  describe('with a project and user', function () {
    let clock

    before(function () {
      clock = sinon.useFakeTimers({ now: new Date(2019, 9, 1, 12), toFake: ['Date'] })
      const user = {
        id: '123',
        login: 'test.user'
      }
      rootStore.user.set(user)
    })

    after(function () {
      clock.restore()
      rootStore.client.panoptes.get.resetHistory()
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
        rootStore.user.personalization.setTotalClassificationCount(23)
        rootStore.user.personalization.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(24)
      })

      it('should add 1 to your session count', function () {
        expect(rootStore.user.personalization.sessionCount).to.equal(1)
      })
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

    describe('incrementing your classification count', function () {
      before(function () {
        rootStore.user.personalization.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.user.personalization.totalClassificationCount).to.equal(1)
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
          { count: 12, period: '2019-09-30T00:00:00Z' },
          { count: 13, period: '2019-10-01T00:00:00Z' },
          { count: 14, period: '2019-10-02T00:00:00Z' },
          { count: 10, period: '2019-10-03T00:00:00Z' },
          { count: 11, period: '2019-10-04T00:00:00Z' },
          { count: 8, period: '2019-10-05T00:00:00Z' },
          { count: 15, period: '2019-10-06T00:00:00Z' }
        ]
        const personalizationStore = UserPersonalization.create({ stats: { thisWeek: MOCK_DAILY_COUNTS } })
        expect(personalizationStore.counts.today).to.equal(MOCK_DAILY_COUNTS[1].count)
      })

      it('should be `0` if there are no classifications today', function () {
        const MOCK_DAILY_COUNTS = [
          { count: 12, period: '2019-01-03T00:00:00Z' },
          { count: 13, period: '2019-01-02T00:00:00Z' },
          { count: 14, period: '2019-01-01T00:00:00Z' }
        ]
        const personalizationStore = UserPersonalization.create({ stats: { thisWeek: MOCK_DAILY_COUNTS } })
        expect(personalizationStore.counts.today).to.equal(0)
      })
    })
  })
})
