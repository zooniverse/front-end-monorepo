import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import YourStats from './YourStats'
import withRequireUser from '@shared/components/withRequireUser'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store
  const {
    project,
    user: {
      personalization: { counts }
    }
  } = store
  return {
    counts,
    projectName: project['display_name']
  }
}

function YourStatsContainer({ mockStore }) {
  const { counts, projectName } = useStores(mockStore)
  return <YourStats counts={counts} projectName={projectName} />
}

export default withRequireUser(observer(YourStatsContainer))
export { YourStatsContainer }
