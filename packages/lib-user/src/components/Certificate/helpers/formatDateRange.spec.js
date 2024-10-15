import { formatDateRange } from './formatDateRange'

describe('components > Certificate > formatDateRange', function() {
  it('should format date range with same month', function() {
    const startDate = '2021-01-01'
    const endDate = '2021-01-15'
    const formattedDateRange = formatDateRange({ startDate, endDate })

    expect(formattedDateRange).to.equal('Jan 1 - 15, 2021')
  })

  it('should format date range with same year', function() {
    const startDate = '2021-01-01'
    const endDate = '2021-12-31'
    const formattedDateRange = formatDateRange({ startDate, endDate })

    expect(formattedDateRange).to.equal('Jan 1 - Dec 31, 2021')
  })

  it('should format date range with different year', function() {
    const startDate = '2021-01-01'
    const endDate = '2022-01-31'
    const formattedDateRange = formatDateRange({ startDate, endDate })

    expect(formattedDateRange).to.equal('Jan 1, 2021 - Jan 31, 2022')
  })
})
