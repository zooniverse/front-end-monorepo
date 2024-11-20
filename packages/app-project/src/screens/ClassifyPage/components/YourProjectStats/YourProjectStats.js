import { Box, ResponsiveContext, Text } from 'grommet'
import Loader from '@zooniverse/react-components/Loader'
import SpacedText from '@zooniverse/react-components/SpacedText'
import { arrayOf, bool, object, number, shape, string } from 'prop-types'
import { useContext } from 'react'

import ContentBox from '@shared/components/ContentBox'
import RequireUser from '@shared/components/RequireUser/RequireUser.js'
import { useTranslation } from 'next-i18next'

function Stat({ label = '', value = 0 }) {
  return (
    <Box>
      <SpacedText textAlign='center'>{label}</SpacedText>
      <Text
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        size='xxlarge'
        textAlign='center'
      >
        {/* Insert commmas where appropriate */}
        {value.toLocaleString()}
      </Text>
    </Box>
  )
}

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
  const { t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)
  const linkProps = {
    externalLink: true,
    href: `https://www.zooniverse.org/users/${userLogin}/stats?project_id=${projectID}`
  }

  return (
    <ContentBox
      title={t('Classify.YourStats.title')}
      linkLabel={t('Classify.YourStats.link')}
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
              <span>{error.message}</span>
            </Box>
          ) : data ? (
            <Box
              direction={size === 'small' ? 'row' : 'column'}
              gap='medium'
              fill
              align='center'
              justify='center'
            >
              <Stat
                label={t('Classify.YourStats.lastSeven')}
                value={data?.sevenDaysStats?.total_count}
              />
              <Stat
                label={t('Classify.YourStats.allTime')}
                value={data?.allTimeStats?.total_count}
              />
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
