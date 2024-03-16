'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial GroupStats local development.

import { object, string } from 'prop-types'

import { 
  usePanoptesAuthUser,
  usePanoptesUserGroup,
  useStats
} from '@hooks'

import GroupStats from './GroupStats'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStatsContainer({
  authClient,
  groupId
}) {
  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    authClient,
    authUserId: authUser?.id,
    groupId
  })
  
  const {
    data: groupStats,
    error: groupStatsError,
    isLoading: groupStatsLoading
  } = useStats({
    authClient,
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: groupId
  })

  return (
    <GroupStats
      authClient={authClient}
      data={data}
      groupId={groupId}
      groupStats={groupStats}
    />
  )
}

GroupStatsContainer.propTypes = {
  authClient: object,
  groupId: string
}

export default GroupStatsContainer
