'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial GroupStats local development.

import PropTypes from 'prop-types'

import { 
  useStats,
  usePanoptesUserGroup
} from '@hooks'

import {
  deletePanoptesUserGroup,
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils'

import DeleteGroup from './DeleteGroup.js'
import EditGroup from './EditGroup.js'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStats ({
  authClient,
  groupId
}) {
  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({ authClient, groupId })
  
  const {
    data: groupStats,
    error: groupStatsError,
    isLoading: groupStatsLoading
  } = useStats({ authClient, endpoint: STATS_ENDPOINT, sourceId: groupId })

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

  if (groupError || groupStatsError) return (<p>Error: {groupError?.toString() || groupStatsError?.toString()}</p>)

  if (groupLoading || groupStatsLoading) return (<p>Loading...</p>)

  const group = data?.body?.user_groups?.[0]

  return (
    <div>
      <h2>Hi group with ID {groupId}! 🙌</h2>
      <h3>Your group display_name is {group?.display_name}.</h3>
      <h4>Members: <pre>{group?.links.users.toString()}</pre></h4>
      <h4>Here are your group stats:</h4>
      <pre>{JSON.stringify(groupStats, null, 2)}</pre>
      <hr />
      <EditGroup
        group={group}
        handleGroupUpdate={handleGroupUpdate}
      />
      <br />
      <hr />
      <br />
      <DeleteGroup
        handleGroupDelete={handleGroupDelete}
      />
    </div>
  )
}

GroupStats.propTypes = {
  // authClient: object,
  groupId: PropTypes.string
}

export default GroupStats
