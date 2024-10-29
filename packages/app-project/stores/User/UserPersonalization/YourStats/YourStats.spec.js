import { expect } from 'chai'
import { getSnapshot } from 'mobx-state-tree'
import nock from 'nock'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import { talkAPI } from '@zooniverse/panoptes-js'

import initStore from '@stores/initStore'
import YourStats, { statsClient } from './YourStats'

describe('Stores > YourStats', function () {
  let rootStore, nockScope
  const project = {
    id: '2',
    display_name: 'Hello',
    slug: 'test/project'
  }

  before(function () {
    sinon.stub(console, 'error')

    const MOCK_DAILY_COUNTS = [
      { count: 12, period: '2019-09-29T00:00:00.000Z' },
      { count: 12, period: '2019-09-30T00:00:00.000Z' },
      { count: 13, period: '2019-10-01T00:00:00.000Z' },
      { count: 14, period: '2019-10-02T00:00:00.000Z' },
      { count: 10, period: '2019-10-03T00:00:00.000Z' },
      { count: 11, period: '2019-10-04T00:00:00.000Z' },
      { count: 8, period: '2019-10-05T00:00:00.000Z' },
      { count: 15, period: '2019-10-06T00:00:00.000Z' }
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
      .get('/collections')
      .query(true)
      .reply(200)
      .post('/collections')
      .query(true)
      .reply(200)
    rootStore = initStore(true, { project })
    sinon.stub(statsClient, 'fetchDailyStats').callsFake(({ projectId, userId }) => (projectId === '2' && userId === '123') ?
      Promise.resolve({ data: MOCK_DAILY_COUNTS }) :
      Promise.reject(new Error(`Unable to fetch stats for project ${projectId} and user ${userId}`)))
    sinon.stub(talkAPI, 'get')
  })

  after(function () {
    console.error.restore()
    statsClient.fetchDailyStats.restore()
    talkAPI.get.restore()
    nock.cleanAll()
  })

  it('should exist', function () {
    expect(rootStore.user.personalization.stats).to.be.ok()
  })

  describe('Actions > fetchDailyCounts', function () {
    let clock

    before(function () {
      // Set the local clock to 1am on Tuesday 1 October 2019, UTC.
      // Local time for this test will be 7pm, Monday 30 September 2019, CST.
      clock = sinon.useFakeTimers(new Date('2019-10-01T01:00:00Z'))
      const user = {
        id: '123',
        login: 'test.user'
      }

      process.env.TZ = 'America/Chicago'
      rootStore.user.set(user)
    })

    after(function () {
      clock.restore()
      delete process.env.TZ
    })

    it('should request user statistics', function () {
      expect(statsClient.fetchDailyStats).to.have.been.calledOnceWith({ projectId: '2', userId: '123' })
    })

    describe('weekly classification stats', function () {
      it('should be created', function () {
        expect(getSnapshot(rootStore.user.personalization.stats.thisWeek).length).to.equal(7)
      })

      it('should start on Monday', function () {
        expect(getSnapshot(rootStore.user.personalization.stats.thisWeek[0])).to.deep.equal({
          count: 12,
          dayNumber: 1,
          period: '2019-09-30'
        })
      })

      it('should end on Sunday', function () {
        expect(getSnapshot(rootStore.user.personalization.stats.thisWeek[6])).to.deep.equal({
          count: 15,
          dayNumber: 0,
          period: '2019-10-06'
        })
      })
    })
  })

  describe('on reset', function () {
    it('should reset weekly stats and loading state', function () {
      const MOCK_DAILY_COUNTS = [
        { count: 12, dayNumber: 1, period: '2019-09-29' },
        { count: 12, dayNumber: 2, period: '2019-09-30' },
        { count: 13, dayNumber: 3, period: '2019-10-01' },
        { count: 14, dayNumber: 4, period: '2019-10-02' },
        { count: 10, dayNumber: 5, period: '2019-10-03' },
        { count: 11, dayNumber: 6, period: '2019-10-04' },
        { count: 8, dayNumber: 0, period: '2019-10-05' }
      ]
      const yourStatsStore = YourStats.create({
        loadingState: asyncStates.success,
        thisWeek: MOCK_DAILY_COUNTS
      })
      const signedInStats = yourStatsStore.toJSON()
      yourStatsStore.reset()
      const signedOutStats = yourStatsStore.toJSON()
      expect(signedInStats).to.not.deep.equal(signedOutStats)
    })
  })
})
