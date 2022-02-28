import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import YourStats from './YourStats'
import withRequireUser from '@shared/components/withRequireUser'

function useStoreContext(stores) {
  const { store } = stores || useContext(MobXProviderContext)
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

function YourStatsContainer({ stores }) {
  const { counts, projectName } = useStoreContext(stores)
  return <YourStats counts={counts} projectName={projectName} />
}

export default withRequireUser(observer(YourStatsContainer))
export { YourStatsContainer }
