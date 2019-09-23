import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import DailyClassificationsChart from './DailyClassificationsChartContainer'
const MOCK_DAILY_COUNTS = [
  { count: 87, period: '2019-09-30'},
  { count: 32, period: '2019-10-01' },
  { count: 140, period: '2019-10-02' },
  { count: 105, period: '2019-10-03' },
  { count: 0, period: '2019-10-04' },
  { count: 0, period: '2019-10-05' },
  { count: 0, period: '2019-10-06' }
]

const MOCK_TOTALS = {
  today: 25
}

storiesOf('Project App / Screens / Classify / Daily Classifications Chart', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <DailyClassificationsChart.wrappedComponent
        counts={MOCK_TOTALS}
        thisWeek={MOCK_DAILY_COUNTS}
        projectName="Snapshot Serengeti"
      />
    </Grommet>
  ))

