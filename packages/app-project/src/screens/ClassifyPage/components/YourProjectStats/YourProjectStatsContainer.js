import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

import useYourProjectStats from './useYourProjectStats.js'
import YourProjectStats from './YourProjectStats.js'

function storeMapper(store) {
  const { project, user } = store

  return {
    projectID: project.id,
    userID: user.id
  }
}

/**
 * This is a relatively simple container for ProjectStats, but data fetching
 * and store observing are purposely separated from the presentational component
 * styling and logic. Fetching user data requires authorization, making it
 * complicated to use a mock library like MSW for useYourProjectStats() hook.
*/

function YourProjectStatsContainer() {
  const { store } = useContext(MobXProviderContext)
  const { projectID, userID } = storeMapper(store)

  const { data, loading, error } = useYourProjectStats({ projectID, userID })

  return (
    <YourProjectStats data={data} loading={loading} error={error} userID={userID} />
  )
}

export default observer(YourProjectStatsContainer)
