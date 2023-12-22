import getDateRangeLabel from './getDateRangeLabel.js'

describe('components > shared > BarChart > getDateRangeLabel', function () {
  it('should return the expected dateRangeLabel for Last7Days', function () {
    const dateRange = 'Last7Days'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { weekday: 'short' }
    })      
  })

  it('should return the expected dateRangeLabel for Last30Days', function () {
    const dateRange = 'Last30Days'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { month: 'numeric', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for ThisMonth', function () {
    const dateRange = 'ThisMonth'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Day',
      time: 60,
      timeLabel: 'min',
      tLDS: { day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for Last3Months', function () {
    const dateRange = 'Last3Months'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Week of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { month: 'numeric', day: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for ThisYear', function () {
    const dateRange = 'ThisYear'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { month: 'short' }
    })
  })

  it('should return the expected dateRangeLabel for Last12Months', function () {
    const dateRange = 'Last12Months'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Month of',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { month: 'short', year: 'numeric' }
    })
  })

  it('should return the expected dateRangeLabel for AllTime', function () {
    const dateRange = 'AllTime'
    const dateRangeLabel = getDateRangeLabel(dateRange)
    expect(dateRangeLabel).to.deep.equal({
      countLabel: 'Year',
      time: 3600,
      timeLabel: 'hrs',
      tLDS: { year: 'numeric' }
    })
  })
})
