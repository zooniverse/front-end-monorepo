import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import DailyClassificationsChartContainer from './DailyClassificationsChartContainer'

function storeMapper(store) {
  const {
    project,
    user: {
      personalization: {
        counts,
        stats: {
          thisWeek
        }
      }
    }
  } = store

  return {
    counts,
    thisWeek,
    projectName: project['display_name']
  }
}

function DailyClassificationsChartConnector() {
  const { store } = useContext(MobXProviderContext)
  const { counts, thisWeek, projectName } = storeMapper(store)
  return (
    <DailyClassificationsChartContainer
      counts={counts}
      projectName={projectName}
      thisWeek={thisWeek}
    />
  )
}

export default observer(DailyClassificationsChartConnector)