export default function incrementStats(mutate, projectID, userID) {
  if (!projectID || !userID) return
  mutate(
    prevData => {
      const newStats = {
        allTimeStats: {
          data: prevData.allTimeStats.data,
          total_count: prevData.allTimeStats.total_count + 1
        },
        sevenDaysStats: {
          data: prevData.sevenDaysStats.data,
          total_count: prevData.sevenDaysStats.total_count + 1
        }
      }
      return newStats
    },
    { revalidate: false } // do not refetch stats data while a volunteer classifies on the same project
  )
}
