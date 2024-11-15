import { Box } from 'grommet'
import Loader from '@zooniverse/react-components/Loader'
import { arrayOf, bool, object, number, shape, string } from 'prop-types'

import ContentBox from '@shared/components/ContentBox'
import Stat from '@shared/components/Stat'
import RequireUser from '@shared/components/RequireUser/RequireUser.js'
import ClassificationsChartContainer from './components/ClassificationsChartContainer.js'

const defaultStatsData = {
  allTimeStats: {
    data: [
      {
        count: 0,
        period: ''
      }
    ],
    total_count: 0
  },
  sevenDaysStats: {
    data: [
      {
        count: 0,
        period: ''
      }
    ],
    total_count: 0
  }
}

function YourProjectStats({
  data = defaultStatsData,
  loading = false,
  error = undefined,
  projectID = '',
  userID = '',
  userLogin = ''
}) {
  const linkProps = {
    externalLink: true,
    href: `https://www.zooniverse.org/users/${userLogin}/stats?project_id=${projectID}`
  }

  return (
    <ContentBox
      title='Your Classification Stats'
      linkLabel='More stats'
      linkProps={linkProps}
    >
      {userID ? (
        <>
          {loading ? (
            <Box height='100%' width='100%' align='center'>
              <Loader />
            </Box>
          ) : error ? (
            <Box height='100%' width='100%' align='center'>
              <span>There was an error loading your stats.</span>
            </Box>
          ) : data ? (
            <Box gap='small'>
              <Box
                direction='row'
                gap='large'
                fill
                align='center'
                justify='center'
              >
                <Stat
                  label='Last 7 Days'
                  value={data?.sevenDaysStats?.total_count}
                  valueLoading={loading}
                />
                <Stat
                  label='All TIme'
                  value={data?.allTimeStats?.total_count}
                  valueLoading={loading}
                />
              </Box>
              <ClassificationsChartContainer stats={data.sevenDaysStats} />
            </Box>
          ) : null}
        </>
      ) : (
        <RequireUser />
      )}
    </ContentBox>
  )
}

export default YourProjectStats

YourProjectStats.propTypes = {
  data: shape({
    allTimeStats: shape({
      data: arrayOf(
        shape({
          count: number,
          period: string
        })
      ),
      total_count: number
    }),
    sevenDaysStats: shape({
      data: arrayOf(
        shape({
          count: number,
          period: string
        })
      ),
      total_count: number
    })
  }),
  loading: bool,
  error: object,
  projectID: string,
  userID: string
}
