import { Box } from 'grommet'
import Loader from '@zooniverse/react-components/Loader'
import { array, bool, number, shape, string } from 'prop-types'

import Stat from '@shared/components/Stat'
import RequireUser from '@shared/components/RequireUser/RequireUser.js'

const defaultStatsData = {
  allTimeStats: {
    period: [],
    total_count: 0
  },
  sevenDaysStats: {
    period: [],
    total_count: 0
  }
}

function YourProjectStats({ data = defaultStatsData, loading, error, userID}) {
  return (
    <>
      {userID ? (
        <>
          {loading ?
          <Box height='100%' width='100%' align='center'>
            <Loader />
          </Box>
          : error ? (
            <span>There was an error loading your stats</span>
          ) : (
            <Box direction='row'>
              <Stat label='Last 7 Days' value={data?.sevenDaysStats?.total_count} valueLoading={loading} />
              <Stat label='All TIme' value={data?.allTimeStats?.total_count} valueLoading={loading} />
            </Box>
          )}
        </>
      ) : (
        <RequireUser />
      )}
    </>
  )
}

export default YourProjectStats

YourProjectStats.propTypes = {
  data: shape({
    allTimeStats: shape({
      period: array,
      total_count: number
    }),
    sevenDaysStats: shape({
      period: array,
      total_count: number
    })
  }),
  loading: bool,
  error: bool,
  userID: string
}
