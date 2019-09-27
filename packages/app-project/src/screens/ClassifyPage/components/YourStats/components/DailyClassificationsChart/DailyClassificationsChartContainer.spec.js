import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

import DailyClassificationsChartContainer from './DailyClassificationsChartContainer'
import DailyClassificationsChart from './DailyClassificationsChart'

describe('Component > DailyClassificationsChartContainer', function () {
  let clock
  let wrapper
  let componentWrapper
  const MOCK_DAILY_COUNTS = [
    { count: 12, period: '2019-09-30'},
    { count: 13, period: '2019-10-01' },
    { count: 14, period: '2019-10-02' },
    { count: 10, period: '2019-10-03' },
    { count: 11, period: '2019-10-04' },
    { count: 8, period: '2019-10-05' },
    { count: 15, period: '2019-10-06' }
  ]
  const MOCK_TOTALS = {
    today: 25
  }

  before(function () {
    clock = sinon.useFakeTimers({ now: new Date('2019-10-06'), toFake: ['Date'] })
    wrapper = shallow(
      <DailyClassificationsChartContainer.wrappedComponent
        counts={MOCK_TOTALS}
        projectName="Test Project"
        thisWeek={MOCK_DAILY_COUNTS}
      />
    )
    componentWrapper = wrapper.find(DailyClassificationsChart)
  })

  after(function () {
    clock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `DailyClassificationsChart` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('daily stats counts', function () {
    let stats
    function mockStat(count, period) {
      const day = new Date(period)
      const dayNameShort = day.toLocaleDateString('en', { weekday: 'narrow' })
      const dayNameFull = day.toLocaleDateString('en', { weekday: 'long' })
      return {
        count,
        period,
        alt: `${dayNameFull}: ${count}`,
        label: dayNameShort,
        longLabel: dayNameFull
      }
    }

    before(function () {
      stats = componentWrapper.prop('stats')
    })

    it('should exist for the entire week', function () {
      expect(stats.length).to.equal(7)
    })

    for(let day = 0; day < 7; day++) {
      let stat
      let expectedStat

      before(function () {
        stat = stats[day]
        expectedStat = stat.period === '2019-10-06' ?
          mockStat(MOCK_TOTALS.today, stat.period) :
          mockStat(stat.count, stat.period)
      })

      describe(MOCK_DAILY_COUNTS[day].period, function () {
        it('should have a count', function () {
          expect(stat.count).to.equal(expectedStat.count)
        })

        it('should have a period', function () {
          expect(stat.period).to.equal(expectedStat.period)
        })

        it('should have a short label', function () {
          expect(stat.label).to.equal(expectedStat.label)
        })

        it('should have a long label', function () {
          expect(stat.longLabel).to.equal(expectedStat.longLabel)
        })

        it('should have an accessible description', function () {
          expect(stat.alt).to.equal(expectedStat.alt)
        })
      })
    }
  })
})
