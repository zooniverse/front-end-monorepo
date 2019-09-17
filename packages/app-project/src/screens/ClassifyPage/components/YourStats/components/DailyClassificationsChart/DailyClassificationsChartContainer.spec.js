import { shallow } from 'enzyme'
import React from 'react'

import DailyClassificationsChartContainer from './DailyClassificationsChartContainer'
import DailyClassificationsChart from './DailyClassificationsChart'

describe('Component > DailyClassificationsChartContainer', function () {
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

  before(function () {
    wrapper = shallow(
      <DailyClassificationsChartContainer.wrappedComponent
        projectName="Test Project"
        thisWeek={MOCK_DAILY_COUNTS}
      />
    )
    componentWrapper = wrapper.find(DailyClassificationsChart)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `DailyClassificationsChart` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('daily stats counts', function () {
    let counts

    before(function () {
      counts = componentWrapper.prop('counts')
    })

    it('should exist for the entire week', function () {
      expect(counts.length).to.equal(7)
    })

    for(let day = 0; day < 7; day++) {
      let today
      let dayShort
      let dayLong
      let count

      before(function () {
        today = new Date(2019, 8, 30)
        today.setDate(30 + day)
        dayShort = today.toLocaleDateString('en', { weekday: 'narrow' })
        dayLong = today.toLocaleDateString('en', { weekday: 'long' })
        count = counts[day]
      })

      describe(MOCK_DAILY_COUNTS[day].period, function () {
        it('should have a count', function () {
          expect(count.count).to.equal(MOCK_DAILY_COUNTS[day].count)
        })

        it('should have a period', function () {
          expect(count.period).to.equal(MOCK_DAILY_COUNTS[day].period)
        })

        it('should have a short label', function () {
          expect(count.label).to.equal(dayShort)
        })

        it('should have a long label', function () {
          expect(count.longLabel).to.equal(dayLong)
        })

        it('should have an accessible description', function () {
          expect(count.alt).to.equal(`${dayLong}: ${count.count}`)
        })
      })
    }
  })
})
