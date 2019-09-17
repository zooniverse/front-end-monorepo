import { expect } from 'chai'
import sinon from 'sinon'
import auth from 'panoptes-client/lib/auth'

import initStore from './initStore'
import YourStats, { statsClient } from './YourStats'

describe('Stores > YourStats', function () {
  let rootStore
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }

  before(function () {
    sinon.stub(console, 'error')
    const mockResponse = {
      body: {
        project_preferences: [
          {
            activity_count: 23
          }
        ]
      }
    }
    rootStore = initStore(true, { project })
    sinon.stub(rootStore.client.panoptes, 'get').callsFake(() => Promise.resolve(mockResponse))
    sinon.stub(rootStore.client.panoptes, 'post').callsFake(() => Promise.resolve({}))
    sinon.stub(statsClient, 'request').callsFake(() => Promise.resolve([]))
  })

  after(function () {
    console.error.restore()
    rootStore.client.panoptes.get.restore()
    rootStore.client.panoptes.post.restore()
    statsClient.request.restore()
  })

  it('should exist', function () {
    expect(rootStore.yourStats).to.be.ok()
  })

  describe('with a project and user', function () {
    before(function () {
      const user = {
        id: '123',
        login: 'test.user'
      }
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
    })

    after(function () {
      rootStore.client.panoptes.get.resetHistory()
      rootStore.client.panoptes.post.resetHistory()
      rootStore.collections.fetchFavourites.restore()
    })

    it('should request user preferences', function () {
      const authorization = 'Bearer '
      const endpoint = '/project_preferences'
      const query = {
        project_id: '2',
        user_id: '123'
      }
      expect(rootStore.client.panoptes.get.withArgs(endpoint, query, { authorization })).to.have.been.calledOnce()
    })

    it('should store your activity count', function () {
      expect(rootStore.yourStats.totalCount).to.equal(23)
    })

    it('should request user statistics', function () {
      const query = `{
        statsCount(
          eventType: "classification",
          interval: "1 Day",
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
        rootStore.yourStats.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.yourStats.totalCount).to.equal(24)
      })

      it('should add 1 to your session count', function () {
        expect(rootStore.yourStats.sessionCount).to.equal(1)
      })
    })
  })

  describe('with a project and anonymous user', function () {
    before(function () {
      rootStore = initStore(true, { project })
    })

    it('should not request user preferences from Panoptes', function () {
      expect(rootStore.client.panoptes.get).to.have.not.been.called()
    })

    it('should start counting from 0', function () {
      expect(rootStore.yourStats.totalCount).to.equal(0)
    })

    describe('incrementing your classification count', function () {
      before(function () {
        rootStore.yourStats.increment()
      })

      it('should add 1 to your total count', function () {
        expect(rootStore.yourStats.totalCount).to.equal(1)
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
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
      rootStore.yourStats.increment()
    })

    after(function () {
      auth.checkBearerToken.restore()
      rootStore.collections.fetchFavourites.restore()
    })

    it('should count session classifications from 0', function () {
      expect(rootStore.yourStats.totalCount).to.equal(1)
    })
  })

  describe('on Panoptes API errors', function () {
    before(function () {
      rootStore = initStore(true, { project })
      const user = {
        id: '123',
        login: 'test.user'
      }
      rootStore.client.panoptes.get.callsFake(() => Promise.reject(new Error('Panoptes is not available')))
      sinon.stub(rootStore.collections, 'fetchFavourites')
      rootStore.user.set(user)
      rootStore.yourStats.increment()
    })

    after(function () {
      rootStore.collections.fetchFavourites.restore()
    })

    it('should count session classifications from 0', function () {
      expect(rootStore.yourStats.totalCount).to.equal(1)
    })
  })

  describe('counts view', function () {
    it('should return the expected counts with no data', function () {
      const statsStore = YourStats.create()
      expect(statsStore.counts).to.deep.equal({
        today: 0,
        total: 0
      })
    })

    describe('total count', function () {
      it('should get the total count from the store `totalCount` value', function () {
        const statsStore = YourStats.create({ totalCount: 42 })
        expect(statsStore.counts.total).to.equal(42)
      })
    })

    describe('today\'s count', function () {
      let clock

      before(function () {
        clock = sinon.useFakeTimers({ now: new Date(2019, 9, 1) })
      })

      after(function () {
        clock.restore()
      })

      it('should get today\'s count from the store\'s counts for this week', function () {
        const MOCK_DAILY_COUNTS = [
          { count: 12, period: '2019-09-30'},
          { count: 13, period: '2019-10-01' },
          { count: 14, period: '2019-10-02' },
          { count: 10, period: '2019-10-03' },
          { count: 11, period: '2019-10-04' },
          { count: 8, period: '2019-10-05' },
          { count: 15, period: '2019-10-06' }
        ]
        const statsStore = YourStats.create({ thisWeek: MOCK_DAILY_COUNTS })
        expect(statsStore.counts.today).to.equal(MOCK_DAILY_COUNTS[1].count)
      })

      it('should be `0` if there are no classifications today', function () {
        const MOCK_DAILY_COUNTS = [
          { count: 12, period: '2019-01-03' },
          { count: 13, period: '2019-01-02' },
          { count: 14, period: '2019-01-01' }
        ]
        const statsStore = YourStats.create({ thisWeek: MOCK_DAILY_COUNTS })
        expect(statsStore.counts.today).to.equal(0)
      })
    })
  })
})
