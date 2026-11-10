import getCompleteData from './getCompleteData'

describe('ProjectStatsPage > BarChart > getCompleteData', function () {
  it('includes every month in the range when the start day is past the end day of the month', function () {
    const data = [{ period: '2026-01-01T00:00:00.000Z', count: 5 }]
    const dateInterval = {
      end_date: '2026-06-15T00:00:00.000Z',
      period: 'month',
      start_date: '2025-10-30T00:00:00.000Z'
    }
    const completeData = getCompleteData(data, dateInterval)
    const months = completeData.map(d => d.period.slice(0, 7))
    expect(months).toEqual([
      '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'
    ])
  })

  it('includes every month when the start day does not exist in an intermediate month', function () {
    const data = [{ period: '2026-01-01T00:00:00.000Z', count: 5 }]
    const dateInterval = {
      end_date: '2026-06-15T00:00:00.000Z',
      period: 'month',
      start_date: '2025-10-28T00:00:00.000Z'
    }
    const completeData = getCompleteData(data, dateInterval)
    const months = completeData.map(d => d.period.slice(0, 7))
    expect(months).toEqual([
      '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'
    ])
  })
})
