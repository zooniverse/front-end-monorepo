import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import DailyClassificationsChart from './components/DailyClassificationsChart'
import ContentBox from '../../../../shared/components/ContentBox'
import Stat from '../../../../shared/components/Stat'
import WidgetHeading from '../../../../shared/components/WidgetHeading'

counterpart.registerTranslations('en', en)

function YourStats (props) {
  const { classificationsToday, classificationsTotal, projectName } = props
  return (
    <ContentBox
      title={counterpart('YourStats.title', { projectName })}
    >
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('YourStats.text')}
      </Paragraph>
      <Box border={{ color: 'light-5', side: 'bottom' }} pad={{ bottom: 'small' }}>
        <Grid columns={['1fr', '1fr']} gap='small'>
          <Stat
            value={classificationsToday}
            label={counterpart('YourStats.classificationsToday')}
          />
          <Stat
            value={classificationsTotal}
            label={counterpart('YourStats.classificationsTotal')}
          />
        </Grid>
      </Box>
      <Box pad={{ top: 'small' }}>
        <WidgetHeading
          text={counterpart('YourStats.dailyCount', { projectName })}
        />
        <DailyClassificationsChart />
      </Box>
    </ContentBox>
  )
}

YourStats.propTypes = {
  projectName: string
}

YourStats.defaultProps = {
  classificationsToday: 0,
  classificationsTotal: 0
}

export default YourStats
