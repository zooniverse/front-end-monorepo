'use client'

import { string } from 'prop-types'

import { 
  useGroupStats,
  usePanoptesUserGroup
} from '@hooks/index.js'

import {
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils/index.js'

import DeleteGroup from './DeleteGroup.js'
import EditGroup from './EditGroup.js'

function GroupStats ({
  authClient,
  groupID
}) {
  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({ authClient, groupID })
  
  const {
    data: groupStats,
    error: groupStatsError,
    isLoading: groupStatsLoading
  } = useGroupStats({ authClient, groupID })

  async function handleGroupUpdate(updates) {
    try {
      const authorization = await getBearerToken(authClient)
      const requestHeaders = {
        authorization,
        etag: data.headers.etag
      }
      
      const updatedGroup = await updatePanoptesUserGroup({ updates, headers: requestHeaders })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (groupError || groupStatsError) return (<p>Error: {groupError || groupStatsError}</p>)

  if (groupLoading || groupStatsLoading) return (<p>Loading...</p>)

  const group = data?.body?.user_groups?.[0]

  return (
    <div>
      <h2>Hi group with ID {groupID}! 🙌</h2>
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
        authClient={authClient}
        groupID={groupID}
        headers={data.headers}
      />
    </div>
  )
}

GroupStats.propTypes = {
  // authClient: object.isRequired,
  groupID: string.isRequired
}

export default GroupStats
