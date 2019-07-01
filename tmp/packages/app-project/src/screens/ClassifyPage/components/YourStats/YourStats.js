import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { number, shape, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import DailyClassificationsChart from './components/DailyClassificationsChart'
import ContentBox from '../../../../shared/components/ContentBox'
import Stat from '../../../../shared/components/Stat'
import WidgetHeading from '../../../../shared/components/WidgetHeading'

counterpart.registerTranslations('en', en)

function YourStats (props) {
  const { counts, projectName } = props

  return (
    <ContentBox title={counterpart('YourStats.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('YourStats.text')}
      </Paragraph>
      <Box border={{ color: 'light-5', side: 'bottom' }} pad={{ bottom: 'small' }}>
        <Grid columns={['1fr', '1fr']} gap='small'>
          <Stat
            label={counterpart('YourStats.todaysCount')}
            value={counts.today}
          />
          <Stat
            label={counterpart('YourStats.totalCount')}
            value={counts.total}
          />
        </Grid>
      </Box>
      <Box pad={{ top: 'small' }}>
        <WidgetHeading
          text={counterpart('YourStats.dailyCount', { projectName })}
          level='3'
        />
        <DailyClassificationsChart />
      </Box>
    </ContentBox>
  )
}

YourStats.propTypes = {
  counts: shape({
    today: number,
    total: number
  }),
  projectName: string
}

YourStats.defaultProps = {
  counts: {
    today: 0,
    total: 0
  }
}

export default YourStats
