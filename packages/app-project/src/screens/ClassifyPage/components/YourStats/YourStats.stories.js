import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { Grommet, base } from 'grommet'

import { YourStatsContainer } from './YourStatsContainer'
import { YourStatsStoreMock } from './YourStats.mock' // Used for DailyClassificationsChart's connector

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockedRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

export default {
	title: 'Project App / Screens / Classify / Your Stats',
	component: YourStatsContainer,
  decorators: [NextRouterStory]
}

// Note: DailyClassificationsChart grabs YourStatsStoreMock, but the dates do not match
// whatever "today" is when you run the storybook, so the visual stats bars will
// not accurately display the mock `thisWeek` data

export const YourStats = () => (
	<Provider store={YourStatsStoreMock}>
		<Grommet theme={base}>
			<YourStatsContainer />
		</Grommet>
	</Provider>
)
