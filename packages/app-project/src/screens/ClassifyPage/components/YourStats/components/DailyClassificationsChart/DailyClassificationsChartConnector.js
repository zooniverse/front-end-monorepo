import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const locale = router?.locale
  const sanitizedLocale = locale === 'test' ? 'en' : locale

  return (
    <DailyClassificationsChartContainer
      counts={counts}
      locale={sanitizedLocale}
      projectName={projectName}
      thisWeek={thisWeek}
    />
  )
}

export default observer(DailyClassificationsChartConnector)