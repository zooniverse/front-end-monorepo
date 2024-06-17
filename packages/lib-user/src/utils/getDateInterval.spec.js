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

  it('should return the expected date interval for the Last7Days date range', function () {
    const dateInterval = getDateInterval('Last7Days')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-04-09'
    })
  })

  it('should return the expected date interval for the Last30Days date range', function () {
    const dateInterval = getDateInterval('Last30Days')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-03-17'      
    })
  })

  it('should return the expected date interval for the ThisMonth date range', function () {
    const dateInterval = getDateInterval('ThisMonth')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'day',
      start_date: '2023-04-01'
    })
  })

  it('should return the expected date interval for the Last3Months date range', function () {
    const dateInterval = getDateInterval('Last3Months')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'week',
      start_date: '2023-01-15'
    })
  })

  it('should return the expected date interval for the ThisYear date range', function () {
    const dateInterval = getDateInterval('ThisYear')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'week',
      start_date: '2023-01-01'
    })
  })

  it('should return the expected date interval for the AllTime date range', function () {
    const dateInterval = getDateInterval('AllTime')
    expect(dateInterval).to.deep.equal({
      end_date: '2023-04-15',
      period: 'year',
      start_date: '2015-07-01'
    })
  })
})
