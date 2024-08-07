import { getCompleteData } from './getCompleteData'

describe('components > shared > BarChart > getCompleteData', function () {
  it('should return the expected data series given an incomplete data series and a dateInterval period of day', function () {
    const data = [
      { period: '2021-01-01T00:00:00.000Z', count: 3, session_time: 180 },
      { period: '2021-01-03T00:00:00.000Z', count: 1, session_time: 60 }
    ]
    const dateInterval = {
      end_date: '2021-01-03T00:00:00.000Z',
      period: 'day',
      start_date: '2021-01-01T00:00:00.000Z'
    }
    const completeData = getCompleteData({ data, dateInterval })
    expect(completeData).to.deep.equal([
      { period: '2021-01-01T00:00:00.000Z', count: 3, session_time: 180, index: 0 },
      { period: '2021-01-02T00:00:00.000Z', count: 0, session_time: 0, index: 1 },
      { period: '2021-01-03T00:00:00.000Z', count: 1, session_time: 60, index: 2 }
    ])
  })

  it('should return the expected data series given an incomplete data series and a dateInterval period of week', function () {
    const data = [
      { period: '2024-01-01T00:00:00.000Z', count: 3, session_time: 180 },
      { period: '2024-01-15T00:00:00.000Z', count: 1, session_time: 60 }
    ]
    const dateInterval = {
      end_date: '2024-01-15T00:00:00.000Z',
      period: 'week',
      start_date: '2024-01-01T00:00:00.000Z'
    }
    const completeData = getCompleteData({ data, dateInterval })
    expect(completeData).to.deep.equal([
      { period: '2024-01-01T00:00:00.000Z', count: 3, session_time: 180, index: 0 },
      { period: '2024-01-08T00:00:00.000Z', count: 0, session_time: 0, index: 1 },
      { period: '2024-01-15T00:00:00.000Z', count: 1, session_time: 60, index: 2 }
    ])
  })

  it('should return the expected data series given an incomplete data series and a dateInterval period of month', function () {
    const data = [
      { period: '2022-09-01T00:00:00.000Z', count: 3, session_time: 180 },
      { period: '2022-12-01T00:00:00.000Z', count: 1, session_time: 60 }
    ]
    const dateInterval = {
      end_date: '2022-12-01T00:00:00.000Z',
      period: 'month',
      start_date: '2022-09-01T00:00:00.000Z'
    }
    const completeData = getCompleteData({ data, dateInterval })
    expect(completeData).to.deep.equal([
      { period: '2022-09-01T00:00:00.000Z', count: 3, session_time: 180, index: 0 },
      { period: '2022-10-01T00:00:00.000Z', count: 0, session_time: 0, index: 1 },
      { period: '2022-11-01T00:00:00.000Z', count: 0, session_time: 0, index: 2 },
      { period: '2022-12-01T00:00:00.000Z', count: 1, session_time: 60, index: 3 }
    ])
  })

  it('should return the expected data series given an incomplete data series and a dateInterval period of year', function () {
    const data = [
      { period: '2020-01-01T00:00:00.000Z', count: 3, session_time: 180 },
      { period: '2024-01-01T00:00:00.000Z', count: 1, session_time: 60 }
    ]
    const dateInterval = {
      end_date: '2024-01-01T00:00:00.000Z',
      period: 'year',
      start_date: '2020-01-01T00:00:00.000Z'
    }
    const completeData = getCompleteData({ data, dateInterval })
    expect(completeData).to.deep.equal([
      { period: '2020-01-01T00:00:00.000Z', count: 3, session_time: 180, index: 0 },
      { period: '2021-01-01T00:00:00.000Z', count: 0, session_time: 0, index: 1 },
      { period: '2022-01-01T00:00:00.000Z', count: 0, session_time: 0, index: 2 },
      { period: '2023-01-01T00:00:00.000Z', count: 0, session_time: 0, index: 3 },
      { period: '2024-01-01T00:00:00.000Z', count: 1, session_time: 60, index: 4 }
    ])
  })
})
