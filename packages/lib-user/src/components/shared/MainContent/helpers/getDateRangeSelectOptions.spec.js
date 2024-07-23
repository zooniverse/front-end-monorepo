import sinon from 'sinon'

import { getDateRangeSelectOptions } from './getDateRangeSelectOptions'

describe.only('utils > getDateRangeSelectOptions', function () {
  let clock

  describe('when the current date is after UTC', function () {

    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date('2023-04-15T12:00:00+02:00'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return the expected date range select options', function () {
      const dateRangeSelectOptions = getDateRangeSelectOptions('2015-07-01')
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

  describe('when the current date is before UTC', function () {
      
    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date('2023-04-15T12:00:00-02:00'))
    })

    afterEach(function () {
      clock.restore()
    })

    it('should return the expected date range select options', function () {
      const dateRangeSelectOptions = getDateRangeSelectOptions('2015-07-01')
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
})
