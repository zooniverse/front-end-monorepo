import sinon from 'sinon'

import { getDateRangeSelectOptions } from './getDateRangeSelectOptions'

describe('components > MainContent > getDateRangeSelectOptions', function () {
  let clock

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date(2023, 3, 15))
  })

  afterEach(function () {
    clock.restore()
  })

  it('should return the expected date range select options', function () {
    const { dateRangeOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
      created_at: '2015-07-01',
      selectedDateRange: {
        endDate: '2023-04-15',
        startDate: '2023-04-09'
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
        value: '2015-07-01'
      },
      {
        label: 'CUSTOM',
        value: 'custom'
      }
    ])
  })

  it('should return the expected selected date range option', function () {
    const { dateRangeSelectOptions, selectedDateRangeOption } = getDateRangeSelectOptions({
      created_at: '2015-07-01',
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
})
