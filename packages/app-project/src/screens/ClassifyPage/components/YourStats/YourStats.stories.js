import { Provider } from 'mobx-react'
import { Grommet, base } from 'grommet'
import { YourStatsContainer } from './YourStatsContainer'
import { YourStatsStoreMock } from './YourStats.mock'

export default {
	title: 'Project App / Screens / Classify / Your Stats',
	component: YourStatsContainer
}

export const YourStats = () => (
	<Provider store={YourStatsStoreMock}>
		<Grommet theme={base}>
			<YourStatsContainer />
		</Grommet>
	</Provider>
)
