'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial GroupStats local development.

import { object, string } from 'prop-types'

import {
  usePanoptesAuthUser,
  usePanoptesUserGroup,
  useStats
} from '@hooks'

import {
  deletePanoptesUserGroup,
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils'

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

  async function getRequestHeaders() {
    const authorization = await getBearerToken(authClient)
    const requestHeaders = {
      authorization,
      etag: data.headers.etag
    }
    return requestHeaders
  }

  async function handleGroupDelete() {
    try {
      const requestHeaders = await getRequestHeaders()
      const deleteResponse = await deletePanoptesUserGroup({ groupId, headers: requestHeaders })
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate(updates) {
    try {
      const requestHeaders = await getRequestHeaders()
      const updatedGroup = await updatePanoptesUserGroup({ updates, headers: requestHeaders })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const group = data?.body?.user_groups?.[0]

  return (
    <GroupStats
      group={group}
      groupStats={groupStats}
      handleGroupDelete={handleGroupDelete}
      handleGroupUpdate={handleGroupUpdate}
    />
  )
}

GroupStatsContainer.propTypes = {
  authClient: object,
  groupId: string
}

export default GroupStatsContainer
