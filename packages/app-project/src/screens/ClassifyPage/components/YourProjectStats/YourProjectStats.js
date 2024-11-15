import { Box } from 'grommet'
import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

import Stat from '@shared/components/Stat'
import useYourProjectStats from './useYourProjectStats.js'

function storeMapper(store) {
  const { project, user } = store

  return {
    projectID: project.id,
    userID: user.id
  }
}

function YourProjectStats() {
  const { store } = useContext(MobXProviderContext)
  const { projectID, userID } = storeMapper(store)

  const { data, loading, error } = useYourProjectStats({ projectID, userID })
  // console.log(data)

  return (
    <>
      {userID ? (
        <>
          {error ? (
            <span>There was an error loading your stats</span>
          ) : (
            <Box direction='row'>
              <Stat label='Last 7 Days' value={data?.sevenDaysStats?.total_count} valueLoading={loading} />
              <Stat label='All TIme' value={data?.allTimeStats?.total_count} valueLoading={loading} />
            </Box>
          )}
        </>
      ) : (
        <Box direction='row'>
          <Stat label='Last 7 Days' value={0} />
          <Stat label='All TIme' value={0} />
        </Box>
      )}
    </>
  )
}

export default observer(YourProjectStats)
