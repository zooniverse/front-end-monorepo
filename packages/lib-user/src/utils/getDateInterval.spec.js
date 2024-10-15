import sinon from 'sinon'

import { getDateInterval } from './getDateInterval'

describe('utils > getDateInterval', function () {
  let clock
  
  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date(2023, 3, 15))
  })

  afterEach(function () {
    clock.restore()
  })

  it('should return the expected date interval for the LAST 7 DAYS date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-04-09'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-04-09'
    })
  })

  it('should return the expected date interval for the LAST 30 DAYS date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-03-17'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-03-17'      
    })
  })

  it('should return the expected date interval for the THIS MONTH date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-04-01'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-04-01'
    })
  })

  it('should return the expected date interval for the LAST 3 MONTHS date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-01-15'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'week',
      start_date: '2023-01-15'
    })
  })

  it('should return the expected date interval for the THIS YEAR, by weeks, date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-01-01'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'week',
      start_date: '2023-01-01'
    })
  })

  it('should return the expected date interval for the THIS YEAR, by months, date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2023-01-01'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'week',
      start_date: '2023-01-01'
    })
  })

  it('should return the expected date interval for the ALL TIME date range', function () {
    const dateInterval = getDateInterval({
      endDate: '2023-04-15',
      startDate: '2015-11-01'
    })
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'year',
      start_date: '2015-11-01'
    })
  })
})
