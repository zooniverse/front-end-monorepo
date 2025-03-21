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

    it('should return the expected date range options in UTC', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2015-07-01',
        selectedDateRange: {
          endDate: '2023-04-15',
          startDate: '2023-04-09'
        }
      })

      // the following expected values are based on the UTC date April 15, 11PM, **NOT** the user's date of April 16, 1AM
      expect(dateRangeOptions).to.deep.equal([
        {
          label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
          value: '2023-04-09'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHIRTYDAYS',
          value: '2023-03-17'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISMONTH',
          value: '2023-04-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHREEMONTHS',
          value: '2023-01-15'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISYEAR',
          value: '2023-01-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTWELVEMONTHS',
          value: '2022-05-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.ALLTIME',
          value: '2015-07-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.CUSTOM',
          value: 'custom'
        }
      ])
    })

    it('should return the expected selected date range option', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2015-11-01',
        selectedDateRange: {
          endDate: '2023-04-15',
          startDate: '2023-04-09'
        }
      })
      expect(selectedDateRangeOption).to.deep.equal({
        label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
        value: '2023-04-09'
      })
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

    it('should return the expected date range options in UTC', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2015-07-01',
        selectedDateRange: {
          endDate: '2023-04-15',
          startDate: '2023-04-09'
        }
      })

      // the following expected values are based on the UTC date April 15, 1AM, **NOT** the user's date of April 14, 11PM
      expect(dateRangeOptions).to.deep.equal([
        {
          label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
          value: '2023-04-09'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHIRTYDAYS',
          value: '2023-03-17'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISMONTH',
          value: '2023-04-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHREEMONTHS',
          value: '2023-01-15'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISYEAR',
          value: '2023-01-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTWELVEMONTHS',
          value: '2022-05-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.ALLTIME',
          value: '2015-07-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.CUSTOM',
          value: 'custom'
        }
      ])
    })

    it('should return the expected selected date range option', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2015-11-01',
        selectedDateRange: {
          endDate: '2023-04-15',
          startDate: '2023-04-09'
        }
      })
      expect(selectedDateRangeOption).to.deep.equal({
        label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
        value: '2023-04-09'
      })
    })
  })

  describe('with a custom date range', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date('2023-04-15T00:00:00Z'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return the expected date range options', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2015-11-01',
        selectedDateRange: {
          endDate: '2023-03-31',
          startDate: '2023-02-01'
        }
      })
      expect(dateRangeOptions).to.deep.equal([
        {
          label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
          value: '2023-04-09'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHIRTYDAYS',
          value: '2023-03-17'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISMONTH',
          value: '2023-04-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHREEMONTHS',
          value: '2023-01-15'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISYEAR',
          value: '2023-01-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTWELVEMONTHS',
          value: '2022-05-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.ALLTIME',
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
        sourceCreatedAtDate: '2015-11-01',
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

  describe('with a source created_at date', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date('2023-04-15T00:00:00Z'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return an All Time option with the source created_at date', function () {
      const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
        sourceCreatedAtDate: '2020-04-15',
        selectedDateRange: {
          endDate: '2023-04-15',
          startDate: '2023-04-09'
        }
      })
      expect(dateRangeOptions).to.deep.equal([
        {
          label: 'MAINCONTENT.DATERANGE.LASTSEVENDAYS',
          value: '2023-04-09'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHIRTYDAYS',
          value: '2023-03-17'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISMONTH',
          value: '2023-04-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTHREEMONTHS',
          value: '2023-01-15'
        },
        {
          label: 'MAINCONTENT.DATERANGE.THISYEAR',
          value: '2023-01-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.LASTTWELVEMONTHS',
          value: '2022-05-01'
        },
        {
          label: 'MAINCONTENT.DATERANGE.ALLTIME',
          value: '2020-04-15'
        },
        {
          label: 'MAINCONTENT.DATERANGE.CUSTOM',
          value: 'custom'
        }
      ])
    })
  })
})
