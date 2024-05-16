'use client'

import asyncStates from '@zooniverse/async-states'
import { Notification } from 'grommet'
import { bool, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'

import {
  usePanoptesMemberships,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership,
  deletePanoptesUserGroup,
  updatePanoptesUserGroup
} from '@utils'

import { getUserGroupStatus } from './helpers/getUserGroupStatus'
import GroupStats from './GroupStats'

function deleteJoinTokenParam() {
  let url = new URL(window.location.href)
  let params = new URLSearchParams(url.search)
  params.delete('join_token')
  url.search = params.toString()
  window.history.pushState({}, '', url.toString())
}

function GroupStatsContainer({
  adminMode,
  authUser,
  groupId,
  joinToken
}) {
  const [joinStatus, setJoinStatus] = useState(null)
  const [showJoinNotification, setShowJoinNotification] = useState(false)

  // fetch user_group
  const {
    data: group,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    adminMode,
    authUserId: authUser?.id,
    groupId,
    joinStatus
  })

  // fetch user_group membership
  const {
    data: membershipsData,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    joinStatus,
    query: {
      user_group_id: groupId,
      user_id: authUser?.id
    }
  })
  let role = null
  if (adminMode) {
    role = 'group_admin'
  } else if (membershipsData) {
    role = membershipsData?.memberships?.[0]?.roles?.[0]
  }
  
  useEffect(function handleJoinGroup() {
    async function createGroupMembership() {
      try {
        await createPanoptesMembership({
          groupId,
          joinToken,
          userId: authUser.id
        })

        deleteJoinTokenParam()
        
        setJoinStatus(asyncStates.success)
        setShowJoinNotification(true)
      } catch (error) {
        console.error(error)
        setJoinStatus(asyncStates.error)
      }
    }

    if (authUser && role === undefined && joinToken && joinStatus === null) {
      setJoinStatus(asyncStates.posting)
      createGroupMembership()
    }

    if (role && joinToken) {
      deleteJoinTokenParam()
    }
  }, [
    authUser,
    groupId,
    joinStatus,
    joinToken,
    role
  ])

  async function handleGroupDelete({ groupId }) {
    try {
      const deleteResponse = await deletePanoptesUserGroup({ groupId })
      console.log('deleteResponse', deleteResponse)
      // window.location.href = `https://www.zooniverse.org/users/${authUser?.login}`
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate({ groupId, data }) {
    try {
      const updatedGroup = await updatePanoptesUserGroup({ groupId, data })
      console.log('updatedGroup', updatedGroup)
      // window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

    } catch (error) {
      console.error(error)
    }
  }
   
  const status = getUserGroupStatus({ authUser, group, groupError, groupLoading, joinStatus, joinToken })

  return (
    <>
      {showJoinNotification && (
        <Notification
          message='New Group Joined!'
          onClose={() => setShowJoinNotification(false)}
          status='normal'
          time={4000}
          toast
        />
      )}
      {status ? (<div>{status}</div>) : (
        <GroupStats
          authUser={authUser}
          group={group}
          handleGroupDelete={handleGroupDelete}
          handleGroupUpdate={handleGroupUpdate}
          login={authUser?.login}
          role={role}
        />
      )}
    </>
  )
}

GroupStatsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string
}

export default GroupStatsContainer
