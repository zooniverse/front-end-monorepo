import sinon from 'sinon'

import { formatSelectOptionDateLabel } from './formatSelectOptionDateLabel'

describe('components > MainContent > formatSelectOptionDateLabel', function () {
  let clock

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date(2023, 3, 15))
  })

  afterEach(function () {
    clock.restore()
  })

  describe('with a date range in the same month and current year', function () {
    it('should return the expected date range label', function () {
      const dateRange = {
        endDate: '2023-04-15',
        startDate: '2023-04-09'
      }
      const label = formatSelectOptionDateLabel(dateRange)
      expect(label).to.equal('APR 9 - 15')
    })
  })

  describe('with a date range in the same current year', function () {
    it('should return the expected date range label', function () {
      const dateRange = {
        endDate: '2023-04-15',
        startDate: '2023-03-09'
      }
      const label = formatSelectOptionDateLabel(dateRange)
      expect(label).to.equal('MAR 9 - APR 15')
    })
  })

  describe('with a date range in different years', function () {
    it('should return the expected date range label', function () {
      const dateRange = {
        endDate: '2023-04-15',
        startDate: '2022-03-09'
      }
      const label = formatSelectOptionDateLabel(dateRange)
      expect(label).to.equal('MAR 9, 22 - APR 15, 23')
    })
  })

  describe('with a date range in the same month and previous year', function () {
    it('should return the expected date range label', function () {
      const dateRange = {
        endDate: '2023-04-15',
        startDate: '2022-04-09'
      }
      const label = formatSelectOptionDateLabel(dateRange)
      expect(label).to.equal('APR 9, 22 - APR 15, 23')
    })
  })
})
