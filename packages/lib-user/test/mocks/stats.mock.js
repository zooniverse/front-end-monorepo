const last7days = [
  {
    "period": "2023-05-27T00:00:00Z",
    "count": 2468,
    "session_time": 3234
  },
  {
    "period": "2023-05-28T00:00:00Z",
    "count": 1234,
    "session_time": 1678
  },
  {
    "period": "2023-05-29T00:00:00Z",
    "count": 1456,
    "session_time": 2432
  },
  {
    "period": "2023-05-30T00:00:00Z",
    "count": 1000,
    "session_time": 2333
  },
  {
    "period": "2023-05-31T00:00:00Z",
    "count": 235,
    "session_time": 1346
  },
  {
    "period": "2023-06-01T00:00:00Z",
    "count": 467,
    "session_time": 1234
  },
  {
    "period": "2023-06-02T00:00:00Z",
    "count": 1876,
    "session_time": 3234
  }
]

const last7DaysFromNow = Array.from(
  { length: 7 },
  (_, i) => ({
    period: new Date(new Date().setDate(new Date().getDate() - i)).toISOString(),
    count: Math.floor(Math.random() * 1000),
    session_time: Math.floor(Math.random() * 1800),
  })
)

const last30days = Array.from(
  { length: 30 }, 
  (_, i) => ({
    period: new Date(2023, 4, 7 + i).toISOString(),
    count: Math.floor(Math.random() * 3000),
    session_time: Math.floor(Math.random() * 5400),
  })
)

const thisMonth = Array.from(
  { length: 19 },
  (_, i) => ({
    period: new Date(2023, 6, 1 + i).toISOString(),
    count: Math.floor(Math.random() * 3000),
    session_time: Math.floor(Math.random() * 5400),
  })
)

const last3months = Array.from(
  { length: 12 },
  (_, i) => ({
    period: new Date(2023, 4, 3 + (i * 7)).toISOString(),
    count: Math.floor(Math.random() * 21000),
    session_time: Math.floor(Math.random() * 37800),
  })
)

const thisYearLessThan6Months = Array.from(
  { length: 19 },
  (_, i) => ({
    period: new Date(2023, 0, 1 + (i * 7)).toISOString(),
    count: Math.floor(Math.random() * 21000),
    session_time: Math.floor(Math.random() * 37800),
  })
)

const thisYearMoreThan6Months = Array.from(
  { length: 9 },
  (_, i) => ({
    period: new Date(2023, i, 1).toISOString(),
    count: Math.floor(Math.random() * 84000),
    session_time: Math.floor(Math.random() * 151200),
  })
)

const last12months = Array.from(
  { length: 12 },
  (_, i) => ({
    period: new Date(2022, 9 + i, 1).toISOString(),
    count: Math.floor(Math.random() * 84000),
    session_time: Math.floor(Math.random() * 151200),
  })
)

const allTime = Array.from(
  { length: 9 },
  (_, i) => ({
    period: new Date(2015 + i, 0, 1).toISOString(),
    count: Math.floor(Math.random() * 200000),
    session_time: Math.floor(Math.random() * 302400),
  })
)

const STATS = {
  data: last7DaysFromNow,
  project_contributions: [
    {
      count: 123,
      project_id: 1
    },
    {
      count: 234,
      project_id: 2
    },
    {
      count: 345,
      project_id: 3
    },
    {
      count: 456,
      project_id: 4
    },
    {
      count: 567,
      project_id: 5
    }
  ],
  total_count: 1725,
  time_spent: 123456
}

export {
  last7days,
  last7DaysFromNow,
  last30days,
  thisMonth,
  last3months,
  thisYearLessThan6Months,
  thisYearMoreThan6Months,
  last12months,
  allTime,
  STATS
}