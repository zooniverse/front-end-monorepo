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
      count: 2123,
      project_id: 1
    },
    {
      count: 3234,
      project_id: 2
    },
    {
      count: 2345,
      project_id: 3
    },
    {
      count: 3456,
      project_id: 4
    },
    {
      count: 2567,
      project_id: 5
    },
    {
      count: 3678,
      project_id: 6
    },
    {
      count: 2789,
      project_id: 7
    },
    {
      count: 3890,
      project_id: 8
    },
    {
      count: 2901,
      project_id: 9
    },
    {
      count: 1000,
      project_id: 10
    },
    {
      count: 1100,
      project_id: 11
    },
    {
      count: 1200,
      project_id: 12
    },
    {
      count: 1300,
      project_id: 13
    },
    {
      count: 1400,
      project_id: 14
    },
    {
      count: 1500,
      project_id: 15
    },
    {
      count: 1600,
      project_id: 16
    },
    {
      count: 1700,
      project_id: 17
    },
    {
      count: 1800,
      project_id: 18
    },
    {
      count: 1900,
      project_id: 19
    },
    {
      count: 2000,
      project_id: 20
    }
  ],
  top_contributors: [
    {
      count: 123,
      user_id: 12345
    },
    {
      count: 234,
      user_id: 54321
    },
    {
      count: 345,
      user_id: 67890
    },
    {
      count: 456,
      user_id: 23456
    },
    {
      count: 567,
      user_id: 34567
    },
    {
      count: 678,
      user_id: 45678
    },
    {
      count: 789,
      user_id: 56789
    },
    {
      count: 890,
      user_id: 99876
    }
  ],
  total_count: 1725,
  time_spent: 123456
}

const group_member_stats_breakdown = [
  {
    user_id: 12345,
    count: 13425,
    session_time: 234456,
    project_contributions: [
      {
        project_id: 1,
        count: 121,
        session_time: 21234
      },
      {
        project_id: 2,
        count: 93,
        session_time: 34879
      },
      {
        project_id: 4,
        count: 45,
        session_time: 56567
      },
      {
        project_id: 5,
        count: 36,
        session_time: 67342
      }
    ]
  },
  {
    user_id: 67890,
    count: 9574,
    session_time: 345126,
    project_contributions: [
      {
        project_id: 2,
        count: 56,
        session_time: 34747
      },
      {
        project_id: 4,
        count: 45,
        session_time: 56223
      },
      {
        project_id: 5,
        count: 23,
        session_time: 67234
      }
    ]
  },
  {
    user_id: 99876,
    count: 648,
    session_time: 456347,
    project_contributions: [
      {
        project_id: 3,
        count: 56,
        session_time: 45234
      },
      {
        project_id: 4,
        count: 45,
        session_time: 56234
      },
      {
        project_id: 5,
        count: 3,
        session_time: 67678
      }
    ]
  }
]

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
  group_member_stats_breakdown,
  STATS
}
