import getDateRangeLabel from './getDateRangeLabel.js'

describe('components > shared > BarChart > getDateRangeLabel', function () {
  it('should return the expected dateRangeLabel for LAST 7 DAYS', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-09-07',
      start_date: '2021-09-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', weekday: 'short' }
    })      
  })

  it('should return the expected dateRangeLabel for LAST 30 DAYS', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-09-15',
      start_date: '2021-08-16'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for THIS MONTH', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-09-30',
      start_date: '2021-09-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { timeZone: 'UTC', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for LAST 3 MONTHS', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-09-30',
      start_date: '2021-07-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Week of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for THIS YEAR, period of week', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-3-31',
      start_date: '2021-01-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Week of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'numeric', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for THIS YEAR, period of month', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-12-31',
      start_date: '2021-03-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'short' }
    })
  })

  it('should return the expected dateRangeLabel for LAST 12 MONTHS', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2021-09-30',
      start_date: '2020-10-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', month: 'short', year: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for ALL TIME', function () {
    const dateRangeLabel = getDateRangeLabel({
      end_date: '2023-09-30',
      start_date: '2018-01-01'
    })
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Year',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { timeZone: 'UTC', year: 'numeric' }
    })
  })
})
