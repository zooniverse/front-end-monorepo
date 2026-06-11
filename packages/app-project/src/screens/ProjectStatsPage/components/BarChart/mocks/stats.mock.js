// From May 27, 2023 to June 3, 2023
const last7days = [
  {
    "period": "2023-05-27T00:00:00Z",
    "count": 2468,
  },
  {
    "period": "2023-05-28T00:00:00Z",
    "count": 1234,
  },
  {
    "period": "2023-05-29T00:00:00Z",
    "count": 1456,
  },
  {
    "period": "2023-05-30T00:00:00Z",
    "count": 1000,
  },
  {
    "period": "2023-05-31T00:00:00Z",
    "count": 235,
  },
  {
    "period": "2023-06-01T00:00:00Z",
    "count": 467,
  },
  {
    "period": "2023-06-02T00:00:00Z",
    "count": 1876,
  }
]

// From May 7 to June 6, 2023
const last30days = Array.from(
  { length: 30 },
  (_, i) => ({
    period: new Date(2023, 4, 7 + i).toISOString(),
    count: Math.floor(Math.random() * 3000),
  })
)

// From May 3 to July 18, 2023
const last3months = Array.from(
  { length: 12 },
  (_, i) => ({
    period: new Date(2023, 4, 1 + (i * 7)).toISOString(),
    count: Math.floor(Math.random() * 21000),
  })
)

// From 2023 to
const allTime = Array.from(
  { length: 9 },
  (_, i) => ({
    period: new Date(2015 + i, 0, 1).toISOString(),
    count: Math.floor(Math.random() * 200000),
  })
)

export {
  last7days,
  last30days,
  last3months,
  allTime
}
