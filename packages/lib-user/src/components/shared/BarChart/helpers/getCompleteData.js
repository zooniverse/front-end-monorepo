export function getCompleteData ({ data, dateInterval }) {
  const completeData = []
  if (data.length > 0) {
    const { end_date, period, start_date } = dateInterval
        
    const startDate = start_date ? new Date(start_date) : new Date(data[0]?.period)
    const endDate = end_date ? new Date(end_date) : new Date()
    let currentDate = startDate
    if (period === 'week') {
      // determine the Monday on or before the start date
      const day = startDate.getUTCDay()
      const diff = startDate.getUTCDate() - day + (day === 0 ? -6 : 1)
      currentDate = new Date(startDate.setUTCDate(diff))
    }
    
    while (currentDate <= endDate) {
      const matchingData = data.find(d => {
        const date = new Date(d?.period)
        const year = currentDate.getUTCFullYear() === date.getUTCFullYear()
        const month = currentDate.getUTCMonth() === date.getUTCMonth()
        const day = currentDate.getUTCDate() === date.getUTCDate()

        if (period === 'year' && year) {
          return true
        } else if (period === 'month' && year && month) {
          return true
        } else {
          return year && month && day
        }
      })
      
      if (matchingData) {
        completeData.push(matchingData)
      } else {
        completeData.push({
          period: currentDate.toISOString(),
          count: 0,
          session_time: 0
        })
      }
      
      if (period === 'day') {
        currentDate.setUTCDate(currentDate.getUTCDate() + 1)
      } else if (period === 'week') {
        currentDate.setUTCDate(currentDate.getUTCDate() + 7)
      } else if (period === 'month') {
        currentDate.setUTCMonth(currentDate.getUTCMonth() + 1)
      } else if (period === 'year') {
        currentDate.setUTCFullYear(currentDate.getUTCFullYear() + 1)
      }
    }
  }
  return completeData
}
