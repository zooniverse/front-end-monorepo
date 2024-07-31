import sinon from 'sinon'

import { getDateRangeSelectOptions } from './getDateRangeSelectOptions'

describe('components > MainContent > getDateRangeSelectOptions', function () {
  let clock

  describe('when the user\'s date is the day after UTC', function () {

    beforeEach(function () {
      // Set the user's clock April 16, 1AM, in a timezone 2 hours ahead of UTC,
      // so that the UTC date is April 15, 11PM
      clock = sinon.useFakeTimers(new Date('2023-04-16T01:00:00+02:00'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return the expected date range select options in UTC', function () {
      const dateRangeSelectOptions = getDateRangeSelectOptions('2015-07-01')

      // the following expected values are based on the UTC date April 15, 11PM, **NOT** the user's date of April 16, 1AM
      expect(dateRangeSelectOptions).to.deep.equal([
        {
          label: 'LAST 7 DAYS',
          value: '2023-04-09'
        },
        {
          label: 'LAST 30 DAYS',
          value: '2023-03-17'
        },
        {
          label: 'THIS MONTH',
          value: '2023-04-01'
        },
        {
          label: 'LAST 3 MONTHS',
          value: '2023-01-15'
        },
        {
          label: 'THIS YEAR',
          value: '2023-01-01'
        },
        {
          label: 'LAST 12 MONTHS',
          value: '2022-05-01'
        },
        {
          label: 'ALL TIME',
          value: '2015-07-01'
        }
      ])
    })
  })

  describe('when the user\'s date is the day before UTC', function () {
      
    beforeEach(function () {
      // Set the user's clock April 14, 11PM, in a timezone 2 hours behind UTC,
      // so that the UTC date is April 15, 1AM
      clock = sinon.useFakeTimers(new Date('2023-04-14T23:00:00-02:00'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return the expected date range select options in UTC', function () {
      const dateRangeSelectOptions = getDateRangeSelectOptions('2015-07-01')

      // the following expected values are based on the UTC date April 15, 1AM, **NOT** the user's date of April 14, 11PM
      expect(dateRangeSelectOptions).to.deep.equal([
        {
          label: 'LAST 7 DAYS',
          value: '2023-04-09'
        },
        {
          label: 'LAST 30 DAYS',
          value: '2023-03-17'
        },
        {
          label: 'THIS MONTH',
          value: '2023-04-01'
        },
        {
          label: 'LAST 3 MONTHS',
          value: '2023-01-15'
        },
        {
          label: 'THIS YEAR',
          value: '2023-01-01'
        },
        {
          label: 'LAST 12 MONTHS',
          value: '2022-05-01'
        },
        {
          label: 'ALL TIME',
          value: '2015-07-01'
        }
      ])
    })
  })

  it('should return the expected selected date range option', function () {
    const { dateRangeSelectOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
      created_at: '2015-11-01',
      selectedDateRange: {
        endDate: '2023-04-15',
        startDate: '2023-04-09'
      }
    })
    expect(selectedDateRangeOption).to.deep.equal({
      label: 'LAST 7 DAYS',
      value: '2023-04-09'
    })
  })

  describe('with a custom date range', function () {
    it('should return the expected date range options', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        created_at: '2015-11-01',
        selectedDateRange: {
          endDate: '2023-03-31',
          startDate: '2023-02-01'
        }
      })
      expect(dateRangeOptions).to.deep.equal([
        {
          label: 'LAST 7 DAYS',
          value: '2023-04-09'
        },
        {
          label: 'LAST 30 DAYS',
          value: '2023-03-17'
        },
        {
          label: 'THIS MONTH',
          value: '2023-04-01'
        },
        {
          label: 'LAST 3 MONTHS',
          value: '2023-01-15'
        },
        {
          label: 'THIS YEAR',
          value: '2023-01-01'
        },
        {
          label: 'LAST 12 MONTHS',
          value: '2022-05-01'
        },
        {
          label: 'ALL TIME',
          value: '2015-11-01'
        },
        {
          label: 'FEB 1 - MAR 31',
          value: 'custom'
        }
      ])
    })

    it('should return the expected selected date range option', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        created_at: '2015-11-01',
        selectedDateRange: {
          endDate: '2023-03-31',
          startDate: '2023-02-01'
        }
      })
      expect(selectedDateRangeOption).to.deep.equal({
        label: 'FEB 1 - MAR 31',
        value: 'custom'
      })
    })
  })
})
