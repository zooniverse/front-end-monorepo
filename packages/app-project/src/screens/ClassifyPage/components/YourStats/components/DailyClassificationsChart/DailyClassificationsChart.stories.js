import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'

import DailyClassificationsChartContainer from './DailyClassificationsChartContainer'
const MOCK_DAILY_COUNTS = [
  { count: 87, period: '2019-09-30' },
  { count: 32, period: '2019-10-01' },
  { count: 140, period: '2019-10-02' },
  { count: 105, period: '2019-10-03' },
  { count: 10, period: '2019-10-04' },
  { count: 0, period: '2019-10-05' },
  { count: 0, period: '2019-10-06' }
]

const MOCK_TOTALS = {
  today: 25
}

function RouterMock({ children }) {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/research',
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Classify / Daily Classifications Chart',
  component: DailyClassificationsChartContainer,
  args: {
    counts: MOCK_TOTALS,
    projectName: 'Snapshot Serengeti',
    thisWeek: MOCK_DAILY_COUNTS
  }
}

export function Plain({ counts, projectName, thisWeek }) {
  return (
    <RouterMock>
      <Grommet theme={zooTheme}>
        <DailyClassificationsChartContainer
          counts={counts}
          thisWeek={thisWeek}
          projectName={projectName}
        />
      </Grommet>
    </RouterMock>
  )
}
